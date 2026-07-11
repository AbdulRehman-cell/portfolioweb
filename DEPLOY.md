# Deploying PortfolioWeb to Render

This guide will help you deploy your Express.js portfolio web app to [Render](https://render.com) using Docker.

## Prerequisites

- Create a free account on [Render](https://render.com)
- Have your repository on GitHub

## Steps

### 1. Prepare your environment variables

1. Open `.env.example`.
2. Copy it to `.env` and fill in your SMTP credentials and other necessary values.

### 2. Connect Repository to Render

1. Log into Render.
2. Click **New** -> **Web Service**.
3. Select **"Deploy from a repo"** and choose your repository.
4. Choose **"Docker"** as runtime.
5. Render will auto-detect your `Dockerfile`.
6. Set:
    - **Port**: `3000`
    - **Environment variables**: Add those from your `.env` (Render's dashboard is the recommended way for secrets)
    - **Health Check Path**: `/`
    - **Auto Deploy**: enabled

### 3. Deploy

1. Click **Create Web Service** and Render will build & deploy your app.
2. On subsequent pushes to `main`, your site will auto-deploy.
3. Optionally, set up a GitHub Actions secret called `RENDER_API_KEY` and your Render Service ID for auto-deployment (see `.github/workflows/deploy.yml`).

### 4. (Optional) Local development with Docker Compose

```bash
cp .env.example .env
docker-compose up --build
```
Visit [http://localhost:3000](http://localhost:3000)

---

## Troubleshooting

- For logs, use Render dashboard or `docker-compose logs app`.
- If you have SMTP or other APIs, be sure to set those env vars.

---

You’re done!