FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies during build time so they are cached
RUN npm install

# Copy application code
COPY . .

# Generate GraphQL types during build time
RUN npm run codegen

# Expose Next.js default port
EXPOSE 5000

# Set environment variables for Next.js to run inside the container
ENV PORT=5000
ENV HOSTNAME="0.0.0.0"

# When the container starts (docker run):
# 1. Install dependencies (ensures any package changes are up to date)
# 2. Generate GraphQL types
# 3. Start development server
CMD ["sh", "-c", "npm install && npm run codegen && npm run dev"]
