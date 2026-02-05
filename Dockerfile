# ---- Build stage ----
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the frontend
RUN npm run build

# ---- Production stage ----
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy build output to nginx
COPY --from=build /app/dist /usr/share/nginx/html
# If your build folder is "build" instead of "dist", change this line:
# COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]