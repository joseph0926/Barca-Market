import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  PostCreatedEvent,
} from "@joseph0926-barcelona/common";
import { Post } from "../../models/post";
import { queueGroupName } from "./queue-group-name";

export class PostCreatedListener extends Listener<PostCreatedEvent> {
  readonly subject = Subjects.PostCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PostCreatedEvent["data"], msg: Message) {
    const { content, hashtags, images, isPrivate, userId, id, comments } = data;
    const post = Post.build({
      id,
      content,
      hashtags,
      images,
      isPrivate,
      userId,
      comments,
    });
    console.log("post:created DATA => ", data);
    await post.save();
    msg.ack();
  }
}
