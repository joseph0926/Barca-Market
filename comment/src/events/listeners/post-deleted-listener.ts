import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  PostDeletedEvent,
} from "@joseph0926-barcelona/common";
import { queueGroupName } from "./queue-group-name";
import { Comment } from "../../models/comment";
import { Post } from "../../models/post";

export class PostDeletedListener extends Listener<PostDeletedEvent> {
  subject: Subjects.PostDeleted = Subjects.PostDeleted;
  queueGroupName = queueGroupName;

  async onMessage(data: PostDeletedEvent["data"], msg: Message) {
    const post = await Post.findByIdAndDelete(data.id);
    await Comment.deleteMany({ post });

    msg.ack();
  }
}
