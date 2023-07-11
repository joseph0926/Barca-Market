import { PostLikedListener } from "./events/listeners/post-liked-listener";
import { PostViewListener } from "./events/listeners/post-view-listener";
import { natsWrapper } from "./nats-wrapper";
import { redisClient } from "./redis/client";

const start = async () => {
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

    new PostViewListener(natsWrapper.client).listen();
    new PostLikedListener(natsWrapper.client).listen();

    redisClient.on("error", (err) => console.error(err));
    redisClient.connect();
    console.log("Redis 연결 성공!");
  } catch (error) {
    console.log(error);
  }
};

start();
