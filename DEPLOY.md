# DEPLOY.md — Deploy portfolioweb Express.js app to Render

Follow these steps to deploy the project in under 5 minutes.

---

## Prerequisites

- Render.com account (https://dashboard.render.com/)
- GitHub repository with your code
- Configured SMTP credentials (if using contact forms)

---

## 1. Create Render Web Service

1. Log in to Render dashboard.
2. Click "New +" → "Web Service".
3. Choose:
   - **Repo**: Connect your GitHub repository
   - **Environment**: Docker
   - **Build Command**: Leave blank (Dockerfile handles build)
   - **Start Command**: Leave blank (Dockerfile CMD)
4. Add environment variables as needed (see `.env.example`):
   - NODE_ENV=production
   - PORT=3000
   - MAIL_HOST, MAIL_USER, MAIL_PASS, etc.

## 2. Push Code

Make sure your code is pushed to GitHub:
```sh
git add .
git commit -m "Prepare for Render deployment"
git push
```

## 3. Trigger Deploy

- Render will auto-build via `render.yaml` and Dockerfile.
- Healthcheck is set for "/" path on port 3000.
- You can redeploy manually from the Render dashboard.

## 4. (Optional) Local Development

To test locally with Docker Compose:
```sh
cp .env.example .env    # Edit .env if needed
docker-compose up --build
```

---

## CI/CD

- GitHub Actions (`.github/workflows/deploy.yml`) automates deployment on push.
- Set these GitHub secrets:
  - `RENDER_API_KEY`: Get from your Render dashboard
  - `RENDER_SERVICE_ID`: Find in Render service settings

---

## Useful Render Docs

- [Render Docker Deploy docs](https://render.com/docs/docker)
- [Configure environment variables](https://render.com/docs/environment-variables)

---

# Quick Deploy Commands

1. **Push your code to GitHub:**  
   `git push`

2. **Create a Render Web Service using Dockerfile**  
   (Follow Render's UI as above)

3. **Redeploy on changes (auto via CI/CD or Render UI)**

---

Your site will be available at the public Render URL!