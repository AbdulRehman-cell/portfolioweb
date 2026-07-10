# ----------- Multi-stage Dockerfile for Express.js Portfolio Web -----------

# Stage 1: Build dependencies
FROM node:20.11.1-alpine AS builder

WORKDIR /app

# Only install package.json/package-lock.json dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Copy source code and install only prod deps
FROM node:20.11.1-alpine

WORKDIR /app

# Copy dependency tree from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy source code
COPY app.js ./app.js
COPY bin ./bin
COPY public ./public
COPY routes ./routes
COPY views ./views
COPY package.json ./package.json

# Render runs as non-root
RUN addgroup -g 1001 appgroup \
  && adduser -D -u 1001 -G appgroup appuser

USER appuser

EXPOSE 3000

# HEALTHCHECK for production readiness (checks if Express responds)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --spider http://localhost:3000 || exit 1

CMD ["node", "./bin/www"]