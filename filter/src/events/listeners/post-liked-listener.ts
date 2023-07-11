import { Message } from "node-nats-streaming";
import {
  Listener,
  PostLikedEvent,
  Subjects,
} from "@joseph0926-barcelona/common";
import { queueGroupName } from "./queue-group-name";
import { getLikes, likePost, userLikesPost } from "../../queries/likes";
import { MostLikedPostPublisher } from "../publishers/most-liked-post-publisher";
import { postsByLikes } from "../../queries/post/by-likes";

export class PostLikedListener extends Listener<PostLikedEvent> {
  readonly subject = Subjects.PostLiked;
  queueGroupName = queueGroupName;

  async onMessage(data: PostLikedEvent["data"], msg: Message) {
    try {
      const { id, userId } = data;

      const existingLiked = await userLikesPost(id, userId);
      if (existingLiked) {
        msg.ack();
        return;
      }

      await likePost(id, userId);

      const likes = await getLikes(id);
      const mostLiked = await postsByLikes("DESC", 0, 10);
      console.log(mostLiked);

      console.log("post:liked DATA => ", data);

      await new MostLikedPostPublisher(this.client).publish({
        id,
        likes,
        mostLiked,
      });

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
