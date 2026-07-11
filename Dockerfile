# Multi-stage build for a small, secure production image

# Stage 1: Build
FROM node:18.20.2-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (node_modules in /app)
RUN npm ci --only=production

# Stage 2: Runtime
FROM node:18.20.2-alpine

WORKDIR /app

# Copy only needed files from builder and source
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# Expose port (Render expects 3000 for web services)
EXPOSE 3000

# Healthcheck: GET /
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=2 CMD wget --no-verbose --spider http://localhost:3000/ || exit 1

# Start application
CMD ["npm", "start"]