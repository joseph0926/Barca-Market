import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  CommentDeletedEvent,
} from "@joseph0926-barcelona/common";
import { queueGroupName } from "./queue-group-name";
import { Post } from "../../models/post";

export class CommentDeletedListener extends Listener<CommentDeletedEvent> {
  subject: Subjects.CommentDeleted = Subjects.CommentDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: CommentDeletedEvent["data"], msg: Message) {
    try {
      const post = await Post.findById(data.postId);
      if (!post) {
        throw new Error("해당 게시글을 찾을 수 없습니다");
      }

      const commentIndex = post.comments!.indexOf(data.id);
      if (commentIndex > -1) {
        post.comments?.splice(commentIndex, 1);
        await post.save();
      }

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
