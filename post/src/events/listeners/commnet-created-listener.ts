import { Message } from "node-nats-streaming";
import {
  Listener,
  CommentCreatedEvent,
  Subjects,
} from "@joseph0926-barcelona/common";
import { queueGroupName } from "./queue-group-name";
import { Post } from "../../models/post";
import { PostUpdatedPublisher } from "../publishers/post-updated-publisher";

export class CommentCreatedListener extends Listener<CommentCreatedEvent> {
  readonly subject = Subjects.CommentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: CommentCreatedEvent["data"], msg: Message) {
    const post = await Post.findById(data.postId);
    if (!post) {
      throw new Error("해당 게시글을 찾을 수 없습니다");
    }

    post.comments?.push(data.id);

    console.log("comment:created DATA => ", data);

    await post.save();
    await new PostUpdatedPublisher(this.client).publish({
      id: post.id,
      content: post.content,
      isPrivate: post.isPrivate,
      hashtags: post.hashtags,
      images: post.images,
      userId: post.userId,
      version: post.version,
      comments: post.comments,
      totalComments: post.totalComments,
      createdAt: post.createdAt,
    });

    msg.ack();
  }
}
