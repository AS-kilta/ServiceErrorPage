# AS cluster routing error page

Custom error page for AS cluster routing errors. These occur most likely when the destination service is not running or is otherwise not functional. The error page uses return 

## Developing

Once you've created a project and installed dependencies with `bun install`, start a development server:

```bash
bun dev

# or start the server and open the app in a new browser tab
bun dev -- --open
```

Use URL `localhost:5173/?code={error-code}` to test the error page with different status codes. For example, `localhost:5173/?code=503` will show the error page with a 503 (maintenance) status code.

You can view the production version in `localhost:5173/{error-code}.html` by building the docker image and running it with the following command:

```bash
docker build -t error-page .
docker run -p 5173:80 error-page
```

## Building

To create a production version of your app:

```bash
bun run build
```

You can preview the production build with `bun run preview`.

## Running in Production with Docker

This project assumes you are using Traefik as your reverse proxy. You will need to add a middleware configuration to Traefik and set your services to use this middleware. You can either use Trafik's config files or Docker compose labels.

### With Traefik config files

```yml
http:
  middlewares:
    <error-middleware-name>:
      errors:
        status: 500-599
        service: error-page-container:80
        query: /?code={status}
```

```yml
http:
  routers:
    <app-name>:
      middlewares:
        - <error-middleware-name>
```

You can also set the error page as a global middleware.

```yml
entryPoints:
  websecure:
    address: ':443'
    http:
      middlewares: service-error
```

### With Docker Compose labels

```yml
- "traefik.http.middlewares.<error-middleware-name>.errors.status=500-599"
- "traefik.http.middlewares.<error-middleware-name>.errors.service=error-pages@docker"
- "traefik.http.middlewares.<error-middleware-name>.errors.query=/?code={status}"
```
```yml
- "traefik.http.routers.<app-name>.middlewares=<error-middleware-name>"
```