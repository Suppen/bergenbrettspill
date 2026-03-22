# Board Game Club Frontend

This directory contains the mostly static frontend for the Bergen Brettspillklubb website.

## Configuration

No local development environment is currently set up.

The frontend uses environment variables for configuration:

| Variable            | Description                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------- |
| `VOTE_REDIRECT_URL` | URL to redirect `/stem` requests to, to easily change which voting form is currently active |
| `BACKEND_URL`       | URL to the backend service. Requests to `/api/` will be proxied to this URL                 |

## Nginx Configuration

The nginx server is configured to:

- Serve static files from `/usr/share/nginx/html`
- Enable [Server Side Includes (SSI)](https://en.wikipedia.org/wiki/Server_Side_Includes) for HTML composition
- Proxy `/api/*` requests to the backend service (configurable)
- Handle `/stem` redirects (configurable)
- Redirect `/membership` to `/membership.html` (we forgot the `.html` on our physical poster)

## SSI Usage

The site uses nginx's SSI feature for HTML composition. Include files like this:

```html
<!--#include file="header.html"-->
```

## Building for Production

The GitHub Actions workflow automatically builds and pushes the Docker image to GitHub Container Registry on pushes to the `main` branch.

To build manually:

```bash
docker build -t ghcr.io/suppen/bergenbrettspill-frontend:main .
```

## Deployment

The frontend is designed to work with the backend service. Use the provided `docker-compose.yml` to deploy both services together.

## API Endpoints

The frontend expects these API endpoints from the backend:

- `GET /api/games` - List of board games
- `GET /api/events` - Upcoming events

These are automatically proxied to the backend service running on `http://backend:3000`, with the `/api` part stripped.

