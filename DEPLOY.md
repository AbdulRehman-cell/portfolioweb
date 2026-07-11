# 🚀 Production Deployment Guide for portfolioweb

This guide will help you deploy your Express portfolio app to [Render](https://render.com) using Docker. No prior DevOps experience needed!

---

## 1. Prerequisites

- [Render account](https://render.com)
- GitHub repository (already cloned)
- Your app's environment variables (see `.env.example`)

---

## 2. Load Your Environment Vars

Copy `.env.example` to `.env` and set your secrets:

```bash
cp .env.example .env
# Edit .env with your real values: nano .env
```

---

## 3. Push Your Repo to GitHub

If not done yet, initialize git and push:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## 4. Configure Render Service

1. **Log in at [Render.com](https://render.com)**
2. Click "New +" → "Web Service"
3. Choose **"Deploy from a Dockerfile"**
4. Select your GitHub repo
5. Set the **root directory** to the repo folder
6. Expose port `3000` (Render will auto-detect)
7. Add environment variables as in `.env.example`
8. Click "Create Web Service"

---

## 5. (Optional) Deploy via GitHub Actions

- Go to Render → Service → "Settings" → "Deploy Hooks"
- Copy your deploy hook URL
- In GitHub → "Settings" → "Secrets" → "Actions", add:
  - Name: `RENDER_DEPLOY_HOOK`
  - Value: (paste Render webhook URL)
- On each `git push`, Render will auto-deploy!

---

## 6. Manual Local Docker Run

If you want to run locally:

```bash
docker-compose up --build
```

App will be live at [http://localhost:3000](http://localhost:3000)

---

## 7. Health Check Endpoint

Render and docker-compose check `/health`.  
Add this route to your app if it's missing:

```js
// In app.js or routes/health.js
app.get('/health', (req, res) => res.status(200).send('OK'));
```

---

## Deployment Recap

**The fastest way:**  
1. Set up `.env`
2. Push to GitHub
3. Create Render Web Service (Dockerfile)

Your app will go live in minutes 🚀