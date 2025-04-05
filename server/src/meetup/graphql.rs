use graphql_client::GraphQLQuery;

type DateTime = chrono::DateTime<chrono::Utc>;

#[derive(GraphQLQuery)]
#[graphql(
    schema_path = "src/meetup/schema.json",
    query_path = "src/meetup/query.graphql",
    response_derives = "Debug",
    scalar = "DateTime"
)]
pub struct Events;
