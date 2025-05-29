# Use Node.js alpine as base image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Add npm configuration for better reliability and security
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set network-timeout 300000 && \
    npm config set fetch-retry-maxtimeout 300000 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retries 5

# Install dependencies first (caching)
COPY package*.json ./
RUN npm ci --only=production --fetch-retries 5 --fetch-retry-factor 2

# Copy rest of the application
COPY . .

# Create non-root user
USER node

# Set environment variables
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=2048 --max-http-header-size=80000"

# Expose port
EXPOSE 5003

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget -qO- http://localhost:5003/api/auth/health || exit 1

# Start the service
CMD ["node", "server.js"]
