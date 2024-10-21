# frontend/Dockerfile
FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build  # This should generate a 'dist' directory

# Use a lightweight server to serve static files (e.g., nginx)
FROM nginx:alpine

# Make sure to copy from the correct stage
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html  

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
