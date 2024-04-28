# Use the official Node.js 16 image as a base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the working directory
COPY src/RechercheService/package*.json ./

# Install the Node.js dependencies defined in package.json
RUN npm install

# Copy the rest of your service's source code into the working directory
COPY src/RechercheService/ .


# Expose the port that your Node.js service will run on
EXPOSE 80

# Set the command to start your Node.js service
CMD ["node", "app.js"]
