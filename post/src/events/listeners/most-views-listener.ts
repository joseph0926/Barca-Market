import { Message } from "node-nats-streaming";
import {
  Listener,
  MostViewsEvent,
  Subjects,
} from "@joseph0926-barcelona/common";
import { queueGroupName } from "./queue-group-name";
import { Post } from "../../models/post";

export class MostViewsListener extends Listener<MostViewsEvent> {
  readonly subject = Subjects.PostMostViews;
  queueGroupName = queueGroupName;

  async onMessage(data: MostViewsEvent["data"], msg: Message) {
    const post = await Post.findById(data.id);
    if (!post) {
      throw new Error("해당 게시글을 찾을 수 없습니다");
    }

    post.set({
      views: data.views,
      mostViews: data.mostViews,
    });

    msg.ack();
  }
}
