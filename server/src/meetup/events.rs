use crate::meetup::graphql::events as events_query;
use anyhow::{anyhow, Result};
use graphql_client::{GraphQLQuery, Response};

use crate::event::Event;

use super::graphql::{events::EventsGroupByUrlnameEventsEdgesNode, Events};

impl TryFrom<EventsGroupByUrlnameEventsEdgesNode> for Event {
    type Error = anyhow::Error;

    fn try_from(node: EventsGroupByUrlnameEventsEdgesNode) -> Result<Self, Self::Error> {
        Ok(Event {
            id: node.id,
            name: node.title,
            time: node.date_time.ok_or(anyhow!("Invalid start time"))?,
            link: node.event_url,
        })
    }
}

pub async fn get_events() -> Result<Vec<Event>> {
    let variables = events_query::Variables {
        urlname: String::from("bergen-brettspillklubb"),
    };

    let query = Events::build_query(variables);

    let client = reqwest::Client::new();
    let res = client
        .post("https://api.meetup.com/gql-ext")
        .json(&query)
        .send()
        .await?;
    let response_body: Response<events_query::ResponseData> = res.json().await?;

    response_body
        .data
        .ok_or(anyhow!("No data"))?
        .group_by_urlname
        .ok_or(anyhow!("Group not found"))?
        .events
        .edges
        .into_iter()
        .map(|edge| edge.node.try_into())
        .collect()
}
