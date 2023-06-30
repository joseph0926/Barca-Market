import nats from "node-nats-streaming";
import { PostCreatedPublisher } from "./events/post-created-publisher";

const stan = nats.connect("joseph0926-barcelona", "joseph0926", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connect to NATS");

  const publisher = new PostCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "1",
      title: "test01",
      content: "dummy text",
    });
  } catch (error) {
    console.log(error);
  }
});
