FROM node:21-alpine3.18 as builder

WORKDIR /app

COPY package.json ./
COPY src ./src

COPY packages/user-service/package.json ./packages/user-service/
COPY packages/user-service ./packages/user-service

RUN npm install -g typescript npm@latest
RUN npm install

WORKDIR /app/packages/auth-service

RUN npx prisma generate
RUN npm run buildq

FROM node:21-alpine3.18

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src

COPY --from=builder /app/packages/user-service ./packages/user-service

RUN npm install -g typescript pm2 npm@latest
RUN npm i --production

EXPOSE 4003

CMD ["npm", "start", "--prefix", "packages/user-service"]
