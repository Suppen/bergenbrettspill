use std::sync::{Arc, Mutex};

use actix_web::{get, web::Data, App, HttpResponse, HttpServer, Responder};
use bbk_server::{
    bgg_game::get_bgg_games, bgg_game_repository::BGGGameRepository, db::setup_db,
    meetup::events::get_events,
};

// Struct to hold the BGG token and game repository
struct AppState {
    bgg_token: String,
    bgg_game_repository: BGGGameRepository,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let port = std::env::var("PORT")
        .expect("No port provided. Set one with env var PORT")
        .parse()
        .expect("Invalid port");

    let bgg_token = std::env::var("BGG_TOKEN").expect("No BGG_TOKEN provided");

    let db = match std::env::var("DB_PATH") {
        Ok(path) => {
            println!("Using database at {}", path);
            rusqlite::Connection::open(path).expect("Could not open database")
        }
        Err(_) => {
            panic!("No database path provided. Set one with DB_PATH");
        }
    };

    setup_db(&db).expect("Could not setup database");

    let shared_db = Arc::new(Mutex::new(db));

    // Create app state with the BGG token and game repository
    let app_state = Data::new(AppState {
        bgg_token,
        bgg_game_repository: BGGGameRepository::new(shared_db),
    });

    println!("Starting server on port {}", port);

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .service(events)
            .service(games)
    })
    .bind(("0.0.0.0", port))?
    .run()
    .await?;

    Ok(())
}

#[get("/events")]
async fn events() -> impl Responder {
    match get_events().await {
        Ok(evts) => HttpResponse::Ok().json(evts),
        Err(err) => {
            println!("Error: {}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}

#[get("/photos")]
async fn photos() -> impl Responder {
    HttpResponse::NotImplemented().finish()
}

#[get("/games")]
async fn games(app_state: Data<AppState>) -> impl Responder {
    match get_bgg_games(&app_state.bgg_game_repository, &app_state.bgg_token).await {
        Ok(games) => HttpResponse::Ok().json(games),
        Err(err) => {
            println!("Error: {}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}
