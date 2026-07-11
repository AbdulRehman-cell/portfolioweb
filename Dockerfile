```Dockerfile
# Use Node.js official image for the build stage
FROM node:18.16.0 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Build the application if necessary (for example, if using TypeScript)
# RUN npm run build

# Use a smaller image for the final stage
FROM node:18.16.0-slim

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder
COPY --from=builder /app .

# Set the environment variable for production
ENV NODE_ENV production

# Expose the port the app runs on
EXPOSE 3000

# Health check to verify the app is running
HEALTHCHECK --interval=30s --timeout=5s --start-period=2m --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Run the application
CMD ["npm", "start"]
```