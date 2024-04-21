# trender node

drizzle orm demo

## build

```
docker build -t trender-node:v1.0.0 .
```

## run

```bash
# create mysql if no local
cd db
docker compose up -d
cd ..

# edit local env file
cp .env.example .env

docker run --name trender --network="host" --env-file=.env --rm trender-node:v1.0.0
```
