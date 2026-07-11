# Stage 1: Build dependencies
FROM node:18.20.2-alpine AS builder

WORKDIR /app

# Install production dependencies to package-lock.json's hash
COPY package*.json ./
RUN npm ci --production

# Copy application source
COPY . .

# Stage 2: Minimal final image
FROM node:18.20.2-alpine AS app

WORKDIR /app

ENV NODE_ENV=production

# Copy resolved node_modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy all application code (except files ignored by .dockerignore)
COPY . .

# Expose port for Express (default is 3000, can be overridden)
EXPOSE 3000

# Healthcheck for Render (optional, improves reliability)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --spider http://localhost:3000/health || exit 1

# Start the application using www binary (entry point from bin/www)
CMD ["npm", "start"]