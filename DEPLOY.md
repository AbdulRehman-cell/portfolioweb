# Deployment Guide: portfolioweb on Render

Follow these steps to deploy your Express/EJS portfolio app to Render. This process will get your app running securely and production-ready.

## Prerequisites

- [Render](https://render.com) account
- GitHub repository
- Any required environment variables (see `.env.example`)
- Optionally, [Docker](https://docs.docker.com/get-docker/) if running locally

---

## 1. Configure Environment Variables

Create and fill in a `.env` file, based on `.env.example`, with your SMTP credentials and any other needed secrets:

```bash
cp .env.example .env
# Edit .env file to set SMTP_USER and SMTP_PASS
```

---

## 2. Deploy to Render

### Option A: One-click via Render web dashboard

1. **Create a New Web Service** on Render.
2. **Connect your GitHub repo**.
3. **Choose "Node" runtime** and set:
   - **Build Command:** `npm ci`
   - **Start Command:** `npm start`
   - **Environment Variables:** Copy from `.env.example` as needed.
4. **Set Health Check Path:** `/health`
5. Click **"Create"** — Render will handle the deployment.

---

### Option B: Deploy via GitHub Actions (CI/CD)

1. **Set Render API key/secrets**:
   - On Render, create a new web service and note your `serviceId`.
   - In your GitHub repo settings, add secrets:
     - `RENDER_API_KEY`: Your Render API key.
     - `RENDER_SERVICE_ID`: Your service ID.
2. **Push to main branch**:
   ```bash
   git push origin main
   ```
3. GitHub Actions will build, test, and deploy your app automatically!

---

## 3. Optional: Run Locally with Docker

1. Build and run the container:
   ```bash
   docker compose up --build
   ```
2. Visit [http://localhost:3000](http://localhost:3000)

---

## Health Checks

- Your app should expose `/health` endpoint for Render health checks.
- Add in `app.js` or `routes/index.js`:
    ```js
    // In app.js
    app.get('/health', (req, res) => res.status(200).send('OK'));
    ```

---

## Troubleshooting

- Check logs in Render dashboard.
- Verify your environment variables are correct.

---

You’re done! 🚀