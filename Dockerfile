# Multi-stage Dockerfile for Node.js Express App

# Stage 1: Build dependencies
FROM node:20.10.0-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

# Only install production dependencies
RUN npm ci --only=production

# Stage 2: Copy, setup, finalize small runtime image
FROM node:20.10.0-alpine

WORKDIR /app

# Copy dependencies from build step
COPY --from=build /app/node_modules ./node_modules

# Copy app files
COPY . .

# Expose the port the app listens on (default 3000)
EXPOSE 3000

# Health check using curl (alpine install)
RUN apk add --no-cache curl

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD curl --fail http://localhost:3000/health || exit 1

# Start the app
CMD ["npm", "start"]