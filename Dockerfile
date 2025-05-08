# Use Node.js LTS (Long Term Support) as the base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Copy source code and configuration files
COPY tsconfig.json ./
COPY src/ ./src/

# Build TypeScript code
RUN yarn build

# Remove development dependencies
RUN yarn install --frozen-lockfile --production=true

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["yarn", "start"] 