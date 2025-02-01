use anyhow::{anyhow, Error, Result};
use chrono::DateTime;

use crate::event::Event;

#[derive(serde::Deserialize, PartialEq, Debug, Clone)]
pub struct MeetupEvent {
    pub duration: u32,
    pub id: String,
    pub name: String,
    pub time: i64,
    pub local_date: String,
    pub local_time: String,
    pub rsvp_limit: Option<u8>,
    pub waitlist_count: u8,
    pub yes_rsvp_count: u8,
    pub link: String,
}

impl TryFrom<MeetupEvent> for Event {
    type Error = Error;

    fn try_from(meetup_event: MeetupEvent) -> Result<Self, Self::Error> {
        if let Some(time) = DateTime::from_timestamp_millis(meetup_event.time) {
            Ok(Event {
                id: meetup_event.id,
                name: meetup_event.name,
                time,
                link: meetup_event.link,
                attendee_count: meetup_event.yes_rsvp_count,
                waitlist_count: meetup_event.waitlist_count,
                attendee_limit: meetup_event.rsvp_limit,
            })
        } else {
            Err(anyhow!("Invalid timestamp"))
        }
    }
}

pub async fn get_meetup_events() -> Result<Vec<MeetupEvent>> {
    match reqwest::get("https://api.meetup.com/Bergen-Brettspillklubb/events")
        .await?
        .json::<Vec<MeetupEvent>>()
        .await
    {
        Ok(evts) => Ok(evts),
        Err(err) => Err(anyhow!(err)),
    }
}

pub async fn get_events() -> Result<Vec<Event>> {
    get_meetup_events()
        .await?
        .into_iter()
        .map(MeetupEvent::try_into)
        .collect::<Result<Vec<_>, _>>()
}
