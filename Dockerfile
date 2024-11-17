# Use the official Node.js 20 Alpine image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose port 3000 to the host
EXPOSE 3000

# Start the Next.js app (build at runtime)
CMD ["sh", "-c", "npm run build && npm start"]