# Use an official Node.js image as the base image
FROM node:14

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Expose the port that your React app will run on
EXPOSE 8085

run npm install -g serve

# Start the React app on port 8085.
CMD ["serve", "-p", "8085", "build"]
