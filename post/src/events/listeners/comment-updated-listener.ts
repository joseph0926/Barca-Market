import { Message } from "node-nats-streaming";
import {
  Listener,
  CommentUpdatedEvent,
  Subjects,
} from "@joseph0926-barcelona/common";
import { queueGroupName } from "./queue-group-name";
import { Post } from "../../models/post";
import { PostUpdatedPublisher } from "../publishers/post-updated-publisher";
import { Comment } from "../../models/comment";

export class CommentUpdatedListener extends Listener<CommentUpdatedEvent> {
  readonly subject = Subjects.Commentupdated;
  queueGroupName = queueGroupName;

  async onMessage(data: CommentUpdatedEvent["data"], msg: Message) {
    try {
      const post = await Post.findById(data.post.id);
      if (!post) {
        throw new Error("해당 게시글을 찾을 수 없습니다");
      }

      console.log("comment:updated DATA => ", data);

      await post.save();
      await new PostUpdatedPublisher(this.client).publish({
        id: post.id,
        content: post.content,
        hashtags: post.hashtags,
        images: post.images,
        isPrivate: post.isPrivate,
        userId: post.userId,
        version: post.version,
        comments: post.comments,
      });

      msg.ack();
    } catch (error) {
      console.log(error);
      msg.ack();
    }
  }
}
