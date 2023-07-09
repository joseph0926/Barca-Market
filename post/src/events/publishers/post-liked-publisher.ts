import {
  Publisher,
  Subjects,
  PostLikedEvent,
} from "@joseph0926-barcelona/common";

export class PostLikedPublisher extends Publisher<PostLikedEvent> {
  readonly subject = Subjects.PostLiked;
}
