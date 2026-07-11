# Production Deployment Guide: PortfolioWeb (Express)

This guide gets your app running on [Render](https://render.com) with Docker in under 5 minutes.

---

## 1. Prerequisites

- Create a free [Render.com account](https://dashboard.render.com/signup)
- (Recommended) Install Docker locally to test your image: https://docs.docker.com/get-docker/

---

## 2. Prepare Environment Variables

1. Copy `.env.example` to `.env`.
2. Fill in your email SMTP credentials and any required secrets.
   ```bash
   cp .env.example .env
   # Edit .env to set SMTP_HOST, SMTP_USER, SMTP_PASS etc.
   ```

---

## 3. Deploy on Render

### A. Deploy via Render Dashboard

1. **Log In** to [Render Dashboard](https://dashboard.render.com).
2. **Create New Web Service**:
   - Select "Deploy from a repo"
   - Choose your GitHub repository.
   - Set "Runtime" to **Docker**.
   - Render will auto-detect the `Dockerfile` and `render.yaml`.
3. **Set Environment Variables**:
   - Add each key from `.env.example` in the "Environment" section.
4. **Start Deployment**:
   - Click "Create Web Service"
   - Done! Render will build & serve your app.

### B. Deploy via CLI (Locally)

You can also test locally with Docker Compose:

```bash
# Build & run locally
docker-compose up --build
# App will be live at: http://localhost:3000/
```

---

## 4. Automated CI Deploy (GitHub Actions)

Included `.github/workflows/deploy.yml` automatically deploys your app whenever you push to `main`.
- It builds and checks your Docker image.
- To enable Render deploys, add your Render API key as a secret in GitHub (see comments inside workflow).

---

## 5. Health Checks

- Render will check `/` for health (can be changed in `render.yaml`).
- Docker has a health check for port 3000.

---

## 6. Troubleshooting

- Check Render logs for build/runtime errors.
- Make sure you add all secrets/environment variables exactly.
- Use `docker-compose up --build` locally to debug issues before pushing.

---

## Quick Start Summary

1. Copy `.env.example` to `.env` and fill in secrets.
2. Push your repo to GitHub.
3. Connect to Render and deploy.