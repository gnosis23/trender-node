FROM node:18-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm ci

COPY main.ts .

RUN npm run build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs

USER nodejs

CMD ["npm", "run", "start"]
