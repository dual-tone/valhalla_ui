# Use the latest Node.js LTS version
FROM node:22.11-alpine AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn run build

# Production stage
FROM node:22.11-alpine AS production-stage

# Set the working directory
WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy the built application from the build stage
COPY --from=build-stage /app/dist /app

# Use serve to host the application
CMD ["serve", "-l", "3000", "-s", "/app"]

# Expose the application port
EXPOSE 3000