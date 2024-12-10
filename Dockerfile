# Use Node.js version 20-alpine as the base image (lightweight)
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only the essential files
COPY package.json ./

# Install dependencies without copying node_modules
RUN npm install

# Copy only the necessary directories and files for the application
COPY app/ ./app/
COPY jobs/ ./jobs/
COPY persistence/ ./persistence/
COPY public/ ./public/
COPY resources/ ./resources/
COPY routes/ ./routes/
COPY server.js ./

# Expose the port used by your application (adjust as needed)
EXPOSE 3000

# Default command to start the application
CMD ["node", "server.js"]