# Development stage
FROM node:20-slim AS development

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy application code
COPY . .

# Production stage
FROM node:20-slim AS production

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install production dependencies
RUN pnpm install --prod

# Copy application code
COPY . .

# Build application
RUN pnpm build

CMD ["pnpm", "start"] 