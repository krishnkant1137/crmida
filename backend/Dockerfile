# Use the official Node.js image as the base
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Install MongoDB
RUN apk add --no-cache mongodb

# Expose the port your Node.js app will run on
EXPOSE 5000

# Start MongoDB and the Node.js app
CMD ["sh", "-c", "mongod --fork --logpath /var/log/mongodb.log && npm start"]