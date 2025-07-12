# Use official Node image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code into the container
COPY . .

# Expose port 3000 for the Express server
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
