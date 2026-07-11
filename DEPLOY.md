```markdown
# Deployment Guide for Portfolio Web

Follow these steps to deploy the Portfolio Web application in under 5 minutes.

## Prerequisites
- Ensure you have Docker and Docker Compose installed.
- Set up a Render account and obtain your API key.

## Steps to Deploy

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/portfolioweb.git
   cd portfolioweb
   ```

2. **Create an Environment File:**
   Copy the `.env.example` to `.env` and fill in your environment variables.
   ```bash
   cp .env.example .env
   ```

3. **Build and Start the Application:**
   You can directly use Docker Compose to build and run your application.
   ```bash
   docker-compose up --build
   ```

4. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000` to view the application.

5. **Deploy to Render:**
   Make sure you have your RENDER_API_KEY set in GitHub Secrets, then push to main branch:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

Your application will automatically deploy to Render on the main branch push.
```