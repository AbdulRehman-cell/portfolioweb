# ----------- Stage 1: Build -----------
FROM node:20.11.1-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the rest of the app
COPY . .

# ----------- Stage 2: Runtime -----------
FROM node:20.11.1-alpine AS runtime

WORKDIR /app

# Only copy production dependencies and app files
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/app.js ./app.js
COPY --from=build /app/bin ./bin
COPY --from=build /app/public ./public
COPY --from=build /app/routes ./routes
COPY --from=build /app/views ./views
COPY --from=build /app/DEPLOY.md ./DEPLOY.md
COPY --from=build /app/package.json ./package.json

# Healthcheck (port 3000 is typical for Express)
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "./bin/www"]