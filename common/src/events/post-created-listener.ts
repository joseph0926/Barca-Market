import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { PostCreatedEvent } from "./events";
import { Subjects } from "./subjects";

export class PostCreatedListener extends Listener<PostCreatedEvent> {
  readonly subject = Subjects.PostCreated;
  queueGroupName = "some-service";

  onMessage(data: PostCreatedEvent["data"], msg: Message) {
    console.log("Event Data", data);

    msg.ack();
  }
}
