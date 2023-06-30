import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { PostCreatedListener } from "./events/post-created-listener";

const stan = nats.connect(
  "joseph0926-barcelona",
  randomBytes(4).toString("hex"),
  {
    url: "http://localhost:4222",
  }
);

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  new PostCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
