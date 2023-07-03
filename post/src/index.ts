import mongoose from "mongoose";
import app from "./app";
import { natsWrapper } from "./nats-wrapper";

const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET가 정의되어있지 않습니다");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI가 정의되어있지 않습니다");
  }

  try {
    await natsWrapper.connect("barcelona", "asd", "http://nats-srv:4222");
    natsWrapper.client.on("close", () => {
      console.log("NATS connect closed");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB 연결에 성공하였습니다");
  } catch (error) {
    console.log(error);
  }
};

app.listen(3000, () => {
  console.log("서버가 포트번호 3000에서 정상 작동중입니다.");
});

start();
