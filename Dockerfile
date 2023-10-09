# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install mysql2 jsonwebtoken dotenv argon2 cors

# Copy the rest of the application source code to the container
COPY . .

# Copy the SQL initialization script to the container
COPY db_init.sql /docker-entrypoint-initdb.d/

# Build image (if needed)
# RUN npm run build -t user-flow-backend:v0.1 .

# Expose the port your application will run on
EXPOSE 3000

# Define the command to run your application
CMD ["node", "server.js"]
