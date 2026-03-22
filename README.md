# Bergen Brettspillklubb Website

The code for [https://bergenbrettspill.no](https://bergenbrettspill.no). A board game club website with a mostly static
HTML frontend and Rust backend, containerized with Docker.

## Project Structure

```
/
├── client/              # Static frontend (HTML, CSS, JS served by nginx)
├── server/              # Rust backend API
├── docker-compose.yml   # Orchestration for both services
└── .github/workflows/   # GitHub Actions CI/CD
```

See `client/README.md` and `server/README.md` for details on each service.

## Quick Start

### Prerequisites

- Docker and Docker Compose

### Running Locally

Create a `.env` file in the root directory with the required environment variables (see **Configuration** below), then:

```bash
docker-compose up
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3000 (internal, proxied through frontend at `/api/`)

## Configuration

The following environment variables must be provided, either in a `.env` file or directly in `docker-compose.yml`:

| Variable                 | Service  | Description                                                      |
| ------------------------ | -------- | ---------------------------------------------------------------- |
| `BGG_TOKEN`              | backend  | **SECRET** BoardGameGeek API token                               |
| `BGG_GAME_LIST_USERNAME` | backend  | BGG username whose owned game collection to display              |
| `VOTE_REDIRECT_URL`      | frontend | URL that `/stem` redirects to (for configurable voting forms)    |
| `BACKEND_URL`            | frontend | Internal URL of the backend service (e.g. `http://backend:3000`) |

## Architecture

```
Client → Frontend (nginx:80) → static files
                             → /api/* proxied to Backend (Rust:3000) → BGG API / Meetup API
```

- **Frontend**: Static HTML/CSS/JS with nginx. Uses Server Side Includes (SSI) for HTML composition.
- **Backend**: Rust with Actix-web. Fetches data from BoardGameGeek and Meetup.com, caches in SQLite.

## Updating

```bash
git pull origin main
docker-compose down && docker-compose up --build -d
```

## CI/CD

GitHub Actions builds and pushes Docker images to GitHub Container Registry on every push to `main`. Images are not pushed for pull requests.
