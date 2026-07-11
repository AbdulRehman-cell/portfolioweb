# Deploy your PortfolioWeb to Render

Follow these steps to launch your Express.js website on Render in under 5 minutes.

---

## 1. Prerequisites

- [ ] Sign up at [render.com](https://render.com)
- [ ] Ensure your code is pushed to GitHub

---

## 2. Configure Environment Variables

1. Copy `.env.example` to `.env` and fill in the appropriate values:

   ```bash
   cp .env.example .env
   # Edit .env and fill in your SMTP/SESSION secrets etc.
   ```

2. On Render, set these environment variables in the dashboard for your Web Service, or (optionally) in the `render.yaml`.

---

## 3. Deploy with Render

### Automatic Deployment

- Push your code to your repository (on the `main` branch).
- Render will auto-deploy based on your `render.yaml`.

### Manual Steps

1. Log in to Render.
2. Click "New Web Service", import your repo, and select "Docker" as the environment.
3. Render auto-detects `Dockerfile`, uses port 3000, and sets up healthchecks.

### Optional Local Deploy/Test

```bash
# Build and run locally
docker-compose up --build

# Or directly:
docker build -t portfolioweb:0.0.0 .
docker run --rm --env-file .env -p 3000:3000 portfolioweb:0.0.0
```

---

## 4. CI/CD via GitHub Actions

Pushing to `main` automatically triggers Render deployment. Check `.github/workflows/deploy.yml` for details.

---

## 5. Healthchecks

- Render checks `/` for health.
- `docker-compose` and `Dockerfile` include healthchecks.

---

## Troubleshooting

- If deployment fails, see Render's service logs.
- Check `.env` values for correctness (especially email/SMTP).
- Make sure port is set to `3000`.

---

## That's it! Your app is live.