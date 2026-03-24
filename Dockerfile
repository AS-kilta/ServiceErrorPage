# Stage 1: Build the Svelte app
FROM oven/bun:1.3-alpine AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Stage 2: Serve with Bun
FROM oven/bun:1.3-alpine
WORKDIR /app
# Only copy the built static file and the server script
COPY --from=builder /app/dist/index.html /app/dist/index.html
COPY --from=builder /app/server.ts /app/server.ts

EXPOSE 80
CMD ["bun", "server.ts"]
