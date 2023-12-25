FROM node:21-alpine3.18 as builder

WORKDIR /app

COPY package.json ./
COPY src ./src

COPY packages/order-service/package.json ./packages/order-service/
COPY packages/order-service ./packages/order-service

RUN npm install -g typescript npm@latest
RUN npm install

RUN npm run build --prefix packages/order-service

FROM node:21-alpine3.18

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src

COPY --from=builder /app/packages/order-service ./packages/order-service

RUN npm install -g typescript pm2 npm@latest
RUN npm i --production

EXPOSE 4006

CMD ["npm", "start", "--prefix", "packages/order-service"]
