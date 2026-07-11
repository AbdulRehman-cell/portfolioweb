# PortfolioWeb

A Node.js Express portfolio web app for production deployment.

## Local Development

```bash
npm ci
npm start
```

## Deployment

- See [DEPLOY.md](DEPLOY.md) for Render instructions
- Use Docker or docker-compose for containerized dev

## Environment

- Copy `.env.example` to `.env`, fill in required variables.

## Health Check

- App responds to HTTP `/` and provides health on port `3000`.

---