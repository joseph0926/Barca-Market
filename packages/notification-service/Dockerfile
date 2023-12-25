FROM node:21-alpine3.18 as builder

WORKDIR /app

COPY package.json ./
COPY src ./src

COPY packages/notificaion-service/package.json ./packages/notificaion-service/
COPY packages/notificaion-service ./packages/notificaion-service

RUN npm install -g typescript npm@latest
RUN npm install

RUN npm run build --prefix packages/notificaion-service

FROM node:21-alpine3.18

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src

COPY --from=builder /app/packages/notificaion-service ./packages/notificaion-service

RUN npm install -g typescript pm2 npm@latest
RUN npm i --production

EXPOSE 4001

CMD ["npm", "start", "--prefix", "packages/notificaion-service"]
