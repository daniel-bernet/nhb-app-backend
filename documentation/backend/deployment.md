# Deployment documentation

## Run locally

Make sure your DB is ready, ie. migrated and populated:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

To run the backend server, use the following command:

```bash
node server.js
```

## Containerization

Build container image using the following command:

```bash
docker build -t nhb-app-backend .
```

Push container image to docker-hub using the following command:

```bash
docker image push maknis3/nhb-app-backend:latest
```
