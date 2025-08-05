# Dockerfile

# Step 1: Use official Node image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the app
COPY . .

# Step 5: Build the NestJS app
RUN npm run build

# Step 6: Expose port and start app
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
