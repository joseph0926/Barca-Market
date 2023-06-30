import { Publisher } from "./base-publisher";
import { PostCreatedEvent } from "./events";
import { Subjects } from "./subjects";

export class PostCreatedPublisher extends Publisher<PostCreatedEvent> {
  readonly subject = Subjects.PostCreated;
}
