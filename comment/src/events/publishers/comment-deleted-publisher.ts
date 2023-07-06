import {
  Publisher,
  Subjects,
  CommentDeletedEvent,
} from "@joseph0926-barcelona/common";

export class CommentDeletedPublisher extends Publisher<CommentDeletedEvent> {
  readonly subject = Subjects.CommentDeleted;
}
