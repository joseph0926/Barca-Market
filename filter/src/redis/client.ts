import { createClient } from "redis";

if (!process.env.REDIS_HOST) {
  throw new Error("REDIS_HOST가 정의되어있지 않습니다.");
}
// if (!process.env.REDIS_PORT) {
//   throw new Error("REDIS_PORT가 정의되어있지 않습니다.");
// }
// if (!process.env.REDIS_PW) {
//   throw new Error("REDIS_PW가 정의되어있지 않습니다.");
// }

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
  },
});

export { redisClient };
