import { Message } from "node-nats-streaming";
import {
  Listener,
  CommentUpdatedEvent,
  Subjects,
  NotFoundError,
} from "@joseph0926-barcelona/common";
import { queueGroupName } from "./queue-group-name";
import { Post } from "../../models/post";
import { PostUpdatedPublisher } from "../publishers/post-updated-publisher";

export class CommentUpdatedListener extends Listener<CommentUpdatedEvent> {
  readonly subject = Subjects.Commentupdated;
  queueGroupName = queueGroupName;

  async onMessage(data: CommentUpdatedEvent["data"], msg: Message) {
    const post = await Post.findByEvent(data);
    console.log(data);
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
