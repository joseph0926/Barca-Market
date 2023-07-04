import {
  Publisher,
  Subjects,
  CommentUpdatedEvent,
} from "@joseph0926-barcelona/common";

export class CommentUpdatedPublisher extends Publisher<CommentUpdatedEvent> {
  readonly subject = Subjects.Commentupdated;
}
