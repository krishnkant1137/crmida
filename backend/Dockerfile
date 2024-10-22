# Use the official Node.js image (updated to Node.js 18) as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the backend port (5000)
EXPOSE 5000

# Start the backend application
CMD ["npm", "start"]
