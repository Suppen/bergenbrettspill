use anyhow::Result;
use rusqlite::{params, Connection};

pub fn setup_db(connection: &Connection) -> Result<()> {
    connection.execute(
        "CREATE TABLE IF NOT EXISTS bgg_games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        thumbnail_url TEXT NOT NULL,
        bgg_url TEXT NOT NULL,
        title TEXT NOT NULL,
        players_min INTEGER NOT NULL,
        players_max INTEGER NOT NULL,
        playtime_avg INTEGER NOT NULL,
        playtime_min INTEGER NOT NULL,
        playtime_max INTEGER NOT NULL
    )",
        params![],
    )?;

    connection.execute(
        "CREATE TABLE IF NOT EXISTS bgg_games_mechanics (
        game_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        PRIMARY KEY (game_id, name),
        FOREIGN KEY (game_id) REFERENCES bgg_games(id) ON DELETE CASCADE
    )",
        params![],
    )?;

    connection.execute(
        "CREATE TABLE IF NOT EXISTS bgg_expands (
        game_id INTEGER NOT NULL,
        expands_game_id INTEGER NOT NULL,
        PRIMARY KEY (game_id, expands_game_id),
        FOREIGN KEY (game_id) REFERENCES bgg_games(id) ON DELETE CASCADE
        -- Note: No foreign key on expands_game_id, as it should be possible for the base game to not be in the db
    )",
        params![],
    )?;

    Ok(())
}
