FROM node:21-alpine3.18 as builder

WORKDIR /app

COPY package.json ./
COPY src ./src

COPY packages/gig-service/package.json ./packages/gig-service/
COPY packages/gig-service ./packages/gig-service

RUN npm install -g typescript npm@latest
RUN npm install

RUN npm run build --prefix packages/gig-service

FROM node:21-alpine3.18

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src

COPY --from=builder /app/packages/gig-service ./packages/gig-service

RUN npm install -g typescript pm2 npm@latest
RUN npm i --production

EXPOSE 4004

CMD ["npm", "start", "--prefix", "packages/gig-service"]
