# Bergen Brettspillklubb Website

The code for [https://bergenbrettspill.no](https://bergenbrettspill.no). A board game club website with a mostly static
HTML frontend and Rust backend, containerized with Docker.

## Project Structure

```
/
├── frontend/              # Mostly static frontend (HTML, CSS, JS served by nginx)
├── backend/               # Rust backend API
├── docker-compose.dev.yml # Orchestration for both services for development
├── docker-compose.yml     # Orchestration for both services for production
└── .github/workflows/     # GitHub Actions CI/CD
```

See `frontend/README.md` and `backend/README.md` for details on each service.

## Quick Start

### Prerequisites

- Docker and Docker Compose

### Running in Development

Copy the `.env.example` file to `.env`, and fill in the required environment variables (see
[**Configuration**](#configuration) below).

For development with auto-recompilation:

```bash
docker compose -f docker-compose.dev.yml up
```

The first run will build the images automatically — this takes a while. Subsequent runs reuse the existing images and start quickly. If you change a `Dockerfile`, add `--build` to force a rebuild.

**Development setup includes:**

- Auto-recompilation for Rust backend using cargo-watch
- The website available at http://localhost:3000
- Separate backend port at http://localhost:3001

**Note**: Frontend is mostly plain HTML. There's no fancy schmancy frontend framework like Vite, so frontend has no hot
reloading. Reach for your F5 key like in the good old days.

### Running in Production

Create a `.env` file in the root directory with the required environment variables (see
[**Configuration**](#configuration) below), then:

```bash
docker compose up
```

The website is then available at http://localhost:3000. The backend is proxied through http://localhost:3000/api

## Configuration

The following environment variables must be provided, either in a `.env` file or directly in `docker-compose.yml`:

| Variable                 | Service  | Description                                                      |
| ------------------------ | -------- | ---------------------------------------------------------------- |
| `BGG_TOKEN`              | backend  | **SECRET** BoardGameGeek API token                               |
| `BGG_GAME_LIST_USERNAME` | backend  | BGG username whose owned game collection to display              |
| `VOTE_REDIRECT_URL`      | frontend | URL that `/stem` redirects to (for configurable voting forms)    |
| `BACKEND_URL`            | frontend | Internal URL of the backend service (e.g. `http://backend:3000`) |

**Development Note**: For development, you can use `.env.example` as a template:

```bash
cp .env.example .env
```

Then edit the `.env` file with your actual credentials.

## Architecture

```
Client → Frontend (nginx:80) → static files
                             → /api/* proxied to Backend (Rust:3000) → BGG API / Meetup API
```

- **Frontend**: Static HTML/CSS/JS with nginx. Uses Server Side Includes (SSI) for HTML composition.
- **Backend**: Rust with Actix-web. Fetches data from BoardGameGeek and Meetup.com, caches in SQLite.

## Development Workflow

### Making Changes

**Frontend**: Edit files in `./frontend/src/` - changes are reflected immediately thanks to volume mounts.

**Backend**: Edit files in `./backend/src/` - cargo-watch automatically detects changes and recompiles.

### Updating

```bash
git pull origin main
docker compose down && docker compose up --build -d
```

### Troubleshooting

- **Rust compilation issues**: `docker logs bergenbrettspill-backend-dev`
- **Clear cargo cache**: `docker compose -f docker-compose.dev.yml down -v`
- **Rebuild dev images**: `docker compose -f docker-compose.dev.yml up --build`

## CI/CD

GitHub Actions builds and pushes Docker images to GitHub Container Registry on every push to `main`. Images are not pushed for pull requests.
