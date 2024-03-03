FROM node:latest

WORKDIR /app

COPY package.json .

COPY main.ts .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

CMD ["npm", "run", "start"]
