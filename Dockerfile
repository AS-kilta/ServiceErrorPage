# Stage 1: Build the Svelte app
FROM oven/bun:1.3-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the static build (index.html is now self-contained)
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
# Uses default nginx.conf and entrypoint
