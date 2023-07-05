import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  PostUpdatedEvent,
  NotFoundError,
} from "@joseph0926-barcelona/common";
import { Post } from "../../models/post";
import { queueGroupName } from "./queue-group-name";

export class PostUpdatedListener extends Listener<PostUpdatedEvent> {
  readonly subject = Subjects.PostUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: PostUpdatedEvent["data"], msg: Message) {
    const post = await Post.findByEvent(data);
    if (!post) {
      throw new NotFoundError();
    }

    const { id, content, hashtags, images, isPrivate, userId } = data;
    post.set({
      id,
      content,
      hashtags,
      images,
      isPrivate,
      userId,
    });
    await post.save();
    msg.ack();
  }
}
