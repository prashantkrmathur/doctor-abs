# Base Image
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the application
RUN yarn build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy build files
COPY --from=builder /app/dist ./dist
COPY . .

# Expose app port
EXPOSE 3000

# Run the app
CMD ["node", "dist/main"]
