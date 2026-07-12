# Deployment Guide for Portfolio Web Application

This guide will help you deploy the Portfolio Web Application to Render in under 5 minutes.

## Prerequisites
1. Ensure you have installed [Docker](https://docs.docker.com/get-docker/).
2. Set up a Render Account at [Render.com](https://render.com/).

## Steps to Deploy
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Build the Docker image**
   ```bash
   docker-compose build
   ```
   
3. **Deploy to Render**
   Ensure you have your Render API key set in your environment:
   ```bash
   export RENDER_API_KEY=your_api_key_here
   ```
   Now deploy:
   ```bash
   render deploy
   ```
   
Congratulations, your application is now deployed!