import {
  Publisher,
  Subjects,
  CommentCreatedEvent,
} from "@joseph0926-barcelona/common";

export class CommentCreatedPublisher extends Publisher<CommentCreatedEvent> {
  readonly subject = Subjects.CommentCreated;
}
