use anyhow::Result;
use std::{
    collections::HashSet,
    sync::{Arc, Mutex},
};

use rusqlite::{params, params_from_iter, Connection};

use crate::bgg_game::BGGGame;

/// Get the current unix timestamp in seconds
fn unix_timestamp() -> i64 {
    chrono::Utc::now().timestamp()
}

pub struct BGGGameRepository {
    db: Arc<Mutex<Connection>>,
}

impl BGGGameRepository {
    pub fn new(db: Arc<Mutex<Connection>>) -> Self {
        Self { db }
    }

    pub fn upsert(&self, game: &BGGGame) -> Result<()> {
        let mut connection = self.db.lock().unwrap();

        let tx = connection.transaction()?;

        // Upsert the game itself
        tx.execute(
         "INSERT OR REPLACE INTO bgg_games (id, thumbnail_url, bgg_url, title, players_min, players_max, playtime_avg, playtime_min, playtime_max, updated_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
         params![game.id, game.thumbnail_url, game.bgg_url, game.title, game.players_min, game.players_max, game.playtime_avg, game.playtime_min, game.playtime_max, unix_timestamp()])?;

        // Upsert the expands list
        tx.execute(
            "DELETE FROM bgg_expands WHERE game_id = ?",
            params![game.id],
        )?;
        for expands_id in &game.expands_ids {
            tx.execute(
                "INSERT INTO bgg_expands (game_id, expands_game_id) VALUES (?, ?)",
                params![game.id, expands_id],
            )?;
        }

        // Upsert the mechanics
        tx.execute(
            "DELETE FROM bgg_games_mechanics WHERE game_id = ?",
            params![game.id],
        )?;
        for mechanic in &game.mechanics {
            tx.execute(
                "INSERT INTO bgg_games_mechanics (game_id, name) VALUES (?, ?)",
                params![game.id, mechanic],
            )?;
        }

        tx.commit()?;

        Ok(())
    }

    pub fn prune(&self, ids_to_keep: &HashSet<u64>) -> Result<()> {
        let placeholders = ids_to_keep
            .iter()
            .map(|_| "?")
            .collect::<Vec<_>>()
            .join(", ");

        let query = format!(
            "DELETE FROM bgg_games_mechanics WHERE game_id NOT IN ({})",
            placeholders
        );

        let params = params_from_iter(ids_to_keep.iter());

        self.db.lock().unwrap().execute(query.as_str(), params)?;

        Ok(())
    }

    pub fn get_all(&self) -> Result<Vec<BGGGame>> {
        let connection = self.db.lock().unwrap();

        let mut games_stmt = connection.prepare("SELECT id, thumbnail_url, bgg_url, title, players_min, players_max, playtime_avg, playtime_min, playtime_max FROM bgg_games")?;

        let mut expands_stmt =
            connection.prepare("SELECT expands_game_id FROM bgg_expands WHERE game_id = ?")?;

        let mut mechanics_stmt =
            connection.prepare("SELECT name FROM bgg_games_mechanics WHERE game_id = ?")?;

        let games_iter = games_stmt.query_map(params![], |row| {
            let id = row.get::<_, u64>(0)?;

            let mechanics_iter =
                mechanics_stmt.query_map(params![id], |row| row.get::<_, String>(0))?;
            let mut mechanics = HashSet::new();
            for mechanic in mechanics_iter {
                mechanics.insert(mechanic?);
            }

            let expands_iter = expands_stmt.query_map(params![id], |row| row.get::<_, u64>(0))?;
            let mut expands = HashSet::new();
            for expands_id in expands_iter {
                expands.insert(expands_id?);
            }

            let game = BGGGame {
                id,
                thumbnail_url: row.get::<_, String>(1)?,
                bgg_url: row.get::<_, String>(2)?,
                title: row.get::<_, String>(3)?,
                players_min: row.get::<_, u8>(4)?,
                players_max: row.get::<_, u8>(5)?,
                playtime_avg: row.get::<_, u16>(6)?,
                playtime_min: row.get::<_, u16>(7)?,
                playtime_max: row.get::<_, u16>(8)?,
                mechanics,
                expands_ids: expands,
            };

            Ok(game)
        })?;

        let mut games = Vec::new();
        for game in games_iter {
            games.push(game?);
        }

        Ok(games)
    }

    /// Get the IDs of all games that have not been updated in the last `max_age` seconds
    ///
    /// # Arguments
    /// * `max_age` - The maximum age of a game in seconds
    ///
    /// # Returns
    /// A list of game IDs
    pub fn get_ids_of_stale(&self, max_age: i64) -> Result<HashSet<u64>> {
        let connection = self.db.lock().unwrap();

        let stale_timestamp = unix_timestamp() - max_age;

        let mut stmt = connection.prepare("SELECT id FROM bgg_games WHERE updated_time < ?")?;

        let id_iter = stmt.query_map(params![stale_timestamp], |row| row.get::<_, u64>(0))?;

        let mut stale_ids = HashSet::new();
        for id in id_iter {
            stale_ids.insert(id?);
        }

        Ok(stale_ids)
    }

    /// Get the IDs of all games in the database
    ///
    /// # Returns
    /// A set of IDs of all games in the database
    pub fn get_ids(&self) -> Result<HashSet<u64>> {
        let connection = self.db.lock().unwrap();

        let mut stmt = connection.prepare("SELECT id FROM bgg_games")?;

        let id_iter = stmt.query_map(params![], |row| row.get::<_, u64>(0))?;

        let mut ids = HashSet::new();
        for id in id_iter {
            ids.insert(id?);
        }

        Ok(ids)
    }
}
