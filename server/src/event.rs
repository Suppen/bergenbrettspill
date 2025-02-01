use chrono::{DateTime, Utc};

#[derive(serde::Serialize, PartialEq, Eq, Debug, Clone)]
pub struct Event {
    pub id: String,
    pub name: String,
    pub time: DateTime<Utc>,
    pub link: String,
    pub attendee_count: u8,
    pub waitlist_count: u8,
    pub attendee_limit: Option<u8>,
}
