# Base image
FROM node:18-alpine

# Install OpenSSL
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /home/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["npm", "start"]