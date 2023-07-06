import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  PostUpdatedEvent,
} from "@joseph0926-barcelona/common";
import { Post } from "../../models/post";
import { queueGroupName } from "./queue-group-name";

export class PostUpdatedListener extends Listener<PostUpdatedEvent> {
  readonly subject = Subjects.PostUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: PostUpdatedEvent["data"], msg: Message) {
    const post = await Post.findByEvent(data);
    if (!post) {
      throw new Error("해당 게시글을 찾을 수 없습니다");
    }

    const { id, content, hashtags, images, isPrivate, userId, comments } = data;
    post.set({
      id,
      content,
      hashtags,
      images,
      isPrivate,
      userId,
      comments,
    });
    console.log("post:updated DATA => ", data);
    await post.save();
    msg.ack();
  }
}
