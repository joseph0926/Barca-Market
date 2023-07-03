import {
  Publisher,
  Subjects,
  PostUpdatedEvent,
} from "@joseph0926-barcelona/common";

export class PostUpdatedPublisher extends Publisher<PostUpdatedEvent> {
  readonly subject = Subjects.PostUpdated;
}
