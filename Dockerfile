# Stage 1: Build the Svelte app
FROM oven/bun:1.2-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the static build from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html
