# Deploying PortfolioWeb to Render

Follow these steps to deploy your **portfolio web app** to Render in under 5 minutes.

---

## 1. Prerequisites

- Signup at [https://render.com](https://render.com)
- Fork or clone your repository locally
- Install [Docker](https://www.docker.com/) (optional for testing)
- Obtain any necessary secrets (email SMTP credentials, cookie secret)

---

## 2. Environment Setup

1. **Add a `.env` file**:

   ```
   cp .env.example .env
   ```

   Fill in your secrets in `.env`:
   - COOKIE_SECRET
   - SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

2. **Add those environment variables to your Render service**:
   - On Render, go to your web service -> "Environment" -> "Environment Variables", add all from `.env`.

---

## 3. Deploy via Render

1. **Create a new Web Service**
   - Select "Node" environment
   - Connect this GitHub repo
   - It will auto-detect the `render.yaml` and build with `npm ci --production`
   - Health checks will use `/health`

2. **Push your changes**
   - Render auto-deploys from your main/master branch.

3. **Optional: Local Docker Compose Test**
   ```
   docker-compose up --build
   ```
   Access at http://localhost:3000

---

## 4. Verify Deployment

- Visit your Render-provided URL.
- Check that `/health` returns status 200.
- Confirm email functionality (SMTP configured).

---

## Troubleshooting

- If build fails: check Node version is 18.x, app listens to PORT from env.
- Health checks: ensure `/health` route exists and returns 200 (add to app).
- Check logs in Render dashboard for errors.

---

**You’re now production-ready!**