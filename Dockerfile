# Stage 1: Build and install dependencies
FROM node:14 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy over the rest of the app's source code
COPY . .

# Stage 2: Setup the final image
FROM node:14-slim
WORKDIR /usr/src/app
COPY --from=builder /app .
EXPOSE 9001
CMD ["node", "server.js"]
