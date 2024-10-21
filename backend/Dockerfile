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

# Expose the backend port
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
