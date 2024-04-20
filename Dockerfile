# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1

WORKDIR /usr/src/app

COPY package.json bun.lockb main.ts .
RUN bun install --frozen-lockfile --production

# [optional] tests & build
ENV NODE_ENV=production
RUN bun test
RUN bun run build

# run the app
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "main.ts" ]
