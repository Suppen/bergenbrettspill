# Board Game Club Backend

REST API backend for the Bergen Brettspillklubb website, built with Rust and Actix-web.

## Structure

```
server/
├── src/                  # Rust source code
│   ├── main.rs           # Entry point and route definitions
│   ├── lib.rs            # Library root
│   ├── bgg_game.rs       # BoardGameGeek game data models
│   ├── bgg_game_repository.rs # Database operations for games
│   ├── db.rs             # Database setup and schema
│   ├── event.rs          # Event data models
│   └── meetup/           # Meetup.com integration
│
├── Cargo.toml            # Rust dependencies
├── Cargo.lock            # Locked dependency versions
├── Dockerfile            # Container build configuration
└── README.md             # This file
```

## API Endpoints

### Games

- `GET /games` - List board games from BoardGameGeek collection

### Events

- `GET /events` - List upcoming Meetup.com events

### Photos

- `GET /photos` - Placeholder endpoint (returns 501 Not Implemented)

## Development

### Prerequisites

- Rust 1.93+
- Docker (for containerized development)
- SQLite (for local database)

### Running Locally

#### Without Docker

```bash
# Install dependencies
cargo build

# Run the server
cargo run

# Server will be available at http://localhost:3000
```

#### With Docker

```bash
# Build and run
docker build -t bbk-server .
docker run -p 3000:3000 -v ./data:/data bbk-server
```

### Configuration

**Required environment variables:**

| Variable                 | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| `PORT`                   | Port to listen on (default: 3000)                                        |
| `DB_PATH`                | SQLite database path (e.g., `/data/bbk.db`)                              |
| `BGG_TOKEN`              | BoardGameGeek API token. See https://boardgamegeek.com/using_the_xml_api |
| `BGG_GAME_LIST_USERNAME` | BGG username to get the game collection for (only owned games)           |

Example `.env` file:

```
PORT=3000
DB_PATH=/data/bbk.db
BGG_TOKEN=your_bgg_api_token
BGG_GAME_LIST_USERNAME=your_bgg_username
```

## Database

Uses SQLite for caching BoardGameGeek data. The database is automatically initialized at:

- `/data/bbk.db` (in container)
- `./data/bbk.db` (local volume mount)

### Schema

Tables:

- `bgg_games` - BoardGameGeek game metadata
- `bgg_games_mechanics` - Game mechanics
- `bgg_expands` - Game expansion relationships

## Deployment

### With Docker Compose

The backend is designed to work with the frontend service. Use the root `docker-compose.yml`:

```bash
# Start both services
docker-compose up --build

# Backend will be available at http://backend:3000 (internal)
# Frontend proxies API requests automatically
```

### Standalone

```bash
# Build and run
docker build -t ghcr.io/your-repo/backend:latest .
docker run \
  -p 3000:3000 \
  -v ./data:/data \
  -e BGG_TOKEN=your_token \
  -e BGG_GAME_LIST_USERNAME=your_username \
  ghcr.io/your-repo/backend:latest
```

## External APIs

### BoardGameGeek Integration

The backend fetches game data from BoardGameGeek:

1. **Required setup:**
   - Get a BGG API token
   - Set your BGG username
   - Configure both as environment variables

2. **Data flow:**
   - Fetches your BGG collection
   - Caches data in SQLite database
   - Returns formatted game list via `/games` endpoint

### Meetup.com Integration

The backend fetches event data from Meetup.com:

- Uses Meetup's GraphQL API
- Returns upcoming events via `/events` endpoint
- No additional configuration needed

## Data Management

### Database Initialization

The server automatically initializes the database schema on first run.

## Integration with Frontend

The frontend (nginx) proxies API requests to this backend:

- `/api/games` → `http://backend:3000/games`
- `/api/events` → `http://backend:3000/events`

The service name `backend` is defined in docker-compose.yml and resolved via Docker's internal DNS.

## Building for Production

The GitHub Actions workflow automatically builds and pushes the Docker image to GitHub Container Registry on pushes to the `main` branch.

Manual build:

```bash
docker build -t ghcr.io/your-repo/backend:latest .
```
