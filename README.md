# PortfolioWeb

Production-ready Node/Express portfolio site with Render deployment.

## Features

- Dockerized (multi-stage, small image)
- Healthcheck endpoint for Render
- Easy .env example
- GitHub Actions deploy pipeline
- Render and Vercel config included

## Quickstart

1. `cp .env.example .env` — fill blanks
2. `docker-compose up --build` — local test
3. Deploy via Render (see DEPLOY.md)

## Deployment

See DEPLOY.md for step-by-step guide.

## Health Check

A `/health` endpoint returns `{ status: 'ok' }` for platform reliability.