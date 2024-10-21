# Use the official Node.js image as the base
FROM node:14-alpine AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Stage 2: Create the final image with MongoDB
FROM alpine:latest

# Install MongoDB
RUN apk add --no-cache mongodb

# Create MongoDB data directory
RUN mkdir -p /data/db

# Copy Node.js application from the build stage
COPY --from=builder /usr/src/app /usr/src/app

# Set working directory
WORKDIR /usr/src/app

# Expose the ports for both the app and MongoDB
EXPOSE 5000
EXPOSE 27017

# Start MongoDB and the Node.js application
CMD ["sh", "-c", "mongod --fork --logpath /var/log/mongodb.log && npm start"]
