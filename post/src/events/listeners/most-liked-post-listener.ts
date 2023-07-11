import { Message } from "node-nats-streaming";
import {
  Listener,
  MostLikedPostEvent,
  Subjects,
} from "@joseph0926-barcelona/common";
import { queueGroupName } from "./queue-group-name";
import { Post } from "../../models/post";

export class MostLikedPostListener extends Listener<MostLikedPostEvent> {
  readonly subject = Subjects.PostMostLiked;
  queueGroupName = queueGroupName;

  async onMessage(data: MostLikedPostEvent["data"], msg: Message) {
    const { id, likes, mostLiked } = data;

    const post = await Post.findById(id);
    if (!post) {
      throw new Error("해당 게시글을 찾을 수 없습니다");
    }

    console.log("filter:mostviews DATA => ", data);

    post.set({
      likes,
      mostLiked,
    });
    await post.save();

    msg.ack();
  }
}
