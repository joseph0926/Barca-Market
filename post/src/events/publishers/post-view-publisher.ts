import {
  Publisher,
  Subjects,
  PostViewEvent,
} from "@joseph0926-barcelona/common";

export class PostViewPublisher extends Publisher<PostViewEvent> {
  readonly subject = Subjects.PostView;
}
