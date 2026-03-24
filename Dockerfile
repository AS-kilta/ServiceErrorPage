# Stage 1: Build the Svelte app
FROM oven/bun:1.3-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy only the single bundled HTML file
COPY --from=builder /app/dist/index.html /usr/share/nginx/html/index.html
EXPOSE 80
# Nginx's default config will serve index.html for all requests
