import {
  Publisher,
  Subjects,
  PostCreatedEvent,
} from "@joseph0926-barcelona/common";

export class PostCreatedPublisher extends Publisher<PostCreatedEvent> {
  readonly subject = Subjects.PostCreated;
}
