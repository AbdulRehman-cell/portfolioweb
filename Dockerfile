# ---- Build stage ----
FROM node:20.11.1-alpine AS build
WORKDIR /app

# Copy only package files first for cache efficiency
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --production

# Copy remaining app files
COPY . ./

# ---- Production stage ----
FROM node:20.11.1-alpine AS prod
WORKDIR /app

# Copy production node_modules from build
COPY --from=build /app/node_modules ./node_modules

# Copy app files
COPY --from=build /app ./

# Expose port (default Express)
EXPOSE 3000

# Health check endpoint (define in render.yaml for platform, but for local use)
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]