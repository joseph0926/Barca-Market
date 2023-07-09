import app from "./app";
import { natsWrapper } from "./nats-wrapper";
import { redisClient } from "./redis/client";

const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET가 정의되어있지 않습니다");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID가 정의되어있지 않습니다");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL가 정의되어있지 않습니다");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID가 정의되어있지 않습니다");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connect closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    redisClient.on("error", (err) => console.error(err));
    redisClient.connect();
  } catch (error) {
    console.log(error);
  }
};

app.listen(3000, () => {
  console.log("서버가 포트번호 3000에서 정상 작동중입니다.");
});

start();
