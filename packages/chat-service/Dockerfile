FROM node:21-alpine3.18 as builder

WORKDIR /app

COPY package.json ./
COPY src ./src

COPY packages/chat-service/package.json ./packages/chat-service/
COPY packages/chat-service ./packages/chat-service

RUN npm install -g typescript npm@latest
RUN npm install

RUN npm run build --prefix packages/chat-service

FROM node:21-alpine3.18

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src

COPY --from=builder /app/packages/chat-service ./packages/chat-service

RUN npm install -g typescript pm2 npm@latest
RUN npm i --production

EXPOSE 4005

CMD ["npm", "start", "--prefix", "packages/chat-service"]
