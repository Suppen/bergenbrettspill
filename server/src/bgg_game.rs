use std::{borrow::Cow, collections::HashMap};

use std::collections::HashSet;

use anyhow::{anyhow, Result};
use derive_builder::Builder;
use quick_xml::events::attributes::Attributes;
use quick_xml::{events::Event as XMLEvent, name::QName, Reader};
use serde::Serialize;

use crate::bgg_game_repository::BGGGameRepository;



#[derive(Serialize, Builder, PartialEq, Eq, Debug, Clone)]
pub struct BGGGame {
    pub id: u64,
    pub thumbnail_url: String,
    pub bgg_url: String,
    pub title: String,
    pub players_min: u8,
    pub players_max: u8,
    pub playtime_avg: u16,
    pub playtime_min: u16,
    pub playtime_max: u16,
    #[builder(default, setter(each = "mechanic"))]
    pub mechanics: HashSet<String>,
    #[builder(default, setter(each = "expands_id"))]
    pub expands_ids: HashSet<u64>,
}

fn cow_to_string(cow: Cow<[u8]>) -> Result<String> {
    let string = match cow {
        Cow::Borrowed(v) => std::str::from_utf8(v)?.to_string(),
        Cow::Owned(v) => String::from_utf8(v)?,
    };

    Ok(string)
}

fn attributes_to_map(attributes: Attributes) -> HashMap<QName, String> {
    attributes
        .filter_map(Result::ok)
        .map(|attr| (attr.key, cow_to_string(attr.value).unwrap()))
        .collect()
}

pub async fn get_bgg_game_ids(token: &str) -> Result<HashSet<u64>> {
    let client = reqwest::Client::new();
    
    let xml = client
        .get("https://boardgamegeek.com/xmlapi2/collection?username=bergenbrettspill&own=1")
        .header("Authorization", format!("Bearer {}", token))
        .send()
        .await?
        .text()
        .await?;

    let mut game_ids = HashSet::new();

    let mut reader = Reader::from_str(&xml);
    reader.config_mut().trim_text(true);
    loop {
        match reader.read_event() {
            Ok(XMLEvent::Start(e)) if e.name().as_ref() == b"item" => {
                if let Some(attr) = e
                    .attributes()
                    .filter_map(|a| a.ok())
                    .find(|a| a.key == QName(b"objectid"))
                {
                    let id = cow_to_string(attr.value)?;

                    game_ids.insert(id.parse()?);
                }
            }
            Ok(XMLEvent::Eof) => break, // Exit loop when reaching the end of file
            Err(e) => {
                return Err(anyhow!(e));
            }
            _ => (), // Ignore other events
        }
    }

    Ok(game_ids)
}

pub async fn get_bgg_games(bgg_game_repository: &BGGGameRepository, token: &str) -> Result<Vec<BGGGame>> {
    let game_ids = get_bgg_game_ids(token).await?;

    match bgg_game_repository.prune(&game_ids) {
        Ok(_) => (),
        Err(err) => eprintln!("Error pruning games: {}", err),
    }

    let stale_ids = bgg_game_repository.get_ids_of_stale(60 * 60 * 24 * 7)?;
    let existing_ids = bgg_game_repository.get_ids()?;
    let nonexisting_ids = game_ids
        .difference(&existing_ids)
        .copied()
        .collect::<HashSet<_>>();
    let ids_to_fetch = stale_ids
        .union(&nonexisting_ids)
        .copied()
        .collect::<Vec<_>>();

    // BoardGameGeek limits this request to 20 results. Batch them
    const BATCH_SIZE: usize = 20;

    let mut games = Vec::with_capacity(game_ids.len());

    let client = reqwest::Client::new();
    
    for ids in ids_to_fetch
        .iter()
        .map(u64::to_string)
        .collect::<Vec<_>>()
        .chunks(BATCH_SIZE)
    {
        let url = format!(
            "https://boardgamegeek.com/xmlapi2/thing?type=boardgame,boardgameexpansion&id={}",
            ids.join(",")
        );

        let xml = client
            .get(&url)
            .header("Authorization", format!("Bearer {}", token))
            .send()
            .await?
            .text()
            .await?;

        match parse_bgg_games(&xml) {
            Ok(batch) => games.extend(batch),
            Err(err) => println!("Error: {}", err),
        }
    }

    for game in games.iter() {
        bgg_game_repository.upsert(game)?;
    }

    bgg_game_repository.get_all()
}

fn parse_bgg_games(xml: &str) -> Result<Vec<BGGGame>> {
    let mut reader = Reader::from_str(xml);
    reader.config_mut().trim_text(true);

    let mut games = Vec::new();

    let mut current_game: Option<BGGGameBuilder> = None;

    loop {
        match reader.read_event() {
            Ok(XMLEvent::Start(ref e)) => match e.name() {
                QName(b"item") => {
                    let att_map = attributes_to_map(e.attributes());

                    let id = att_map
                        .get(&QName(b"id"))
                        .ok_or(anyhow!("No ID found"))?
                        .parse()
                        .or(Err(anyhow!("Invalid ID")))?;

                    let mut game = BGGGameBuilder::default();
                    game.id(id)
                        .bgg_url(format!("https://boardgamegeek.com/boardgame/{}", id));

                    current_game = Some(game);
                }
                QName(b"thumbnail") => {
                    if let Some(ref mut game) = current_game {
                        if let Ok(XMLEvent::Text(text)) = reader.read_event() {
                            game.thumbnail_url(text.unescape().unwrap_or_default().into());
                        }
                    }
                }
                _ => (),
            },
            Ok(XMLEvent::Empty(ref e)) => {
                if let Some(ref mut game) = current_game {
                    let attr_map = attributes_to_map(e.attributes());
                    match e.name() {
                        QName(b"name") => {
                            if let (Some(t), Some(value)) = (
                                attr_map.get(&QName(b"type")),
                                attr_map.get(&QName(b"value")),
                            ) {
                                if t == "primary" {
                                    game.title(value.into());
                                }
                            }
                        }
                        QName(b"minplayers") => {
                            attr_map
                                .get(&QName(b"value"))
                                .and_then(|s| s.parse().ok())
                                .map(|players_min| game.players_min(players_min));
                        }
                        QName(b"maxplayers") => {
                            attr_map
                                .get(&QName(b"value"))
                                .and_then(|s| s.parse().ok())
                                .map(|players_max| game.players_max(players_max));
                        }
                        QName(b"playingtime") => {
                            attr_map
                                .get(&QName(b"value"))
                                .and_then(|s| s.parse().ok())
                                .map(|playtime_avg| game.playtime_avg(playtime_avg));
                        }
                        QName(b"minplaytime") => {
                            attr_map
                                .get(&QName(b"value"))
                                .and_then(|s| s.parse().ok())
                                .map(|playtime_min| game.playtime_min(playtime_min));
                        }
                        QName(b"maxplaytime") => {
                            attr_map
                                .get(&QName(b"value"))
                                .and_then(|s| s.parse().ok())
                                .map(|playtime_max| game.playtime_max(playtime_max));
                        }
                        QName(b"link") => {
                            if let Some(t) = attr_map.get(&QName(b"type")) {
                                if t == "boardgamemechanic" {
                                    if let Some(value) = attr_map.get(&QName(b"value")) {
                                        game.mechanic(value.into());
                                    }
                                } else if t == "boardgameexpansion" {
                                    if let (Some(inbound), Some(id)) = (
                                        attr_map.get(&QName(b"inbound")),
                                        attr_map.get(&QName(b"id")),
                                    ) {
                                        if inbound == "true" {
                                            if let Ok(expands_id) = id.parse::<u64>() {
                                                game.expands_id(expands_id);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        _ => (),
                    }
                }
            }
            Ok(XMLEvent::End(ref e)) => {
                if e.name() == QName(b"item") {
                    if let Some(game) = current_game.take() {
                        match game.build() {
                            Ok(game) => games.push(game),
                            Err(err) => println!("Error parsing game: {}", err),
                        }
                    }
                }
            }
            Ok(XMLEvent::Eof) => break,
            Err(e) => return Err(anyhow!("Error reading XML: {:?}", e)),
            _ => (),
        }
    }

    Ok(games)
}
