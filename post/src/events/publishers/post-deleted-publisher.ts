import {
  Publisher,
  Subjects,
  PostDeletedEvent,
} from "@joseph0926-barcelona/common";

export class PostDeletedPublisher extends Publisher<PostDeletedEvent> {
  readonly subject = Subjects.PostDeleted;
}
