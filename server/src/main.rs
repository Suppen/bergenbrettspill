use std::sync::{Arc, Mutex};

use actix_web::{get, web::Data, App, HttpResponse, HttpServer, Responder};
use bbk_server::{
    bgg_game::get_bgg_games, bgg_game_repository::BGGGameRepository, db::setup_db,
    meetup::get_events,
};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let db = match std::env::var("BBK_DB_PATH") {
        Ok(path) => {
            println!("Using database at {}", path);
            rusqlite::Connection::open(path).expect("Could not open database")
        }
        Err(_) => {
            panic!("No database path provided. Quitting!");
        }
    };

    setup_db(&db).expect("Could not setup database");

    let shared_db = Arc::new(Mutex::new(db));
    let bgg_game_repository = Data::new(BGGGameRepository::new(shared_db));

    HttpServer::new(move || {
        App::new()
            .app_data(bgg_game_repository.clone())
            .service(events)
            .service(games)
    })
    .bind(("0.0.0.0", 3000))?
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
async fn games(bgg_game_repository: Data<BGGGameRepository>) -> impl Responder {
    match get_bgg_games(bgg_game_repository.get_ref()).await {
        Ok(games) => HttpResponse::Ok().json(games),
        Err(err) => {
            println!("Error: {}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}
