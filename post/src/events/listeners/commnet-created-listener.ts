import { Message } from "node-nats-streaming";
import {
  Listener,
  CommentCreatedEvent,
  Subjects,
  NotFoundError,
} from "@joseph0926-barcelona/common";
import { queueGroupName } from "./queue-group-name";
import { Post } from "../../models/post";
import { PostUpdatedPublisher } from "../publishers/post-updated-publisher";

export class CommentCreatedListener extends Listener<CommentCreatedEvent> {
  readonly subject = Subjects.CommentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: CommentCreatedEvent["data"], msg: Message) {
    const post = await Post.findByEvent(data);
    if (!post) {
      throw new NotFoundError();
    }

    post.set({ commentId: data.id });

    await post.save();
    await new PostUpdatedPublisher(this.client).publish({
      id: post.id,
      content: post.content,
      hashtags: post.hashtags,
      images: post.images,
      isPrivate: post.isPrivate,
      userId: post.userId,
      version: post.version,
      commentId: post.commnetId,
    });

    msg.ack();
  }
}
