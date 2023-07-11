import { Message } from "node-nats-streaming";
import {
  Listener,
  PostViewEvent,
  Subjects,
} from "@joseph0926-barcelona/common";
import { queueGroupName } from "./queue-group-name";
import { getViews, incrementView } from "../../queries/views";
import { postsByViews } from "../../queries/post/by-views";
import { MostViewsPublisher } from "../publishers/most-views-publisher";

export class PostViewListener extends Listener<PostViewEvent> {
  readonly subject = Subjects.PostView;
  queueGroupName = queueGroupName;

  async onMessage(data: PostViewEvent["data"], msg: Message) {
    try {
      await incrementView(data.id);

      const views = await getViews(data.id);
      const mostViews = await postsByViews("DESC", 0, 10);

      console.log("post:view DATA => ", data);

      await new MostViewsPublisher(this.client).publish({
        id: data.id,
        views,
        mostViews,
      });

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
