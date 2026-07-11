# Multi-stage Dockerfile for a secure, production-grade Node.js Express app

# === Build Stage ===
FROM node:20.11.1-alpine AS builder

WORKDIR /app

# Install only production dependencies at this layer for smallest image
COPY package.json package-lock.json ./
RUN npm ci --production

# Copy app source (exclude test/dev files in .dockerignore)
COPY . .

# === Runtime Stage ===
FROM node:20.11.1-alpine

WORKDIR /app

# Copy dependencies and app from builder
COPY --from=builder /app /app

# Set environment variable for production
ENV NODE_ENV=production

# Expose port (as per Express defaults)
EXPOSE 3000

# Healthcheck to ensure container is running
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

# Start the app
CMD ["node", "./bin/www"]