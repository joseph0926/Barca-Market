import {
  Publisher,
  Subjects,
  MostLikedPostEvent,
} from "@joseph0926-barcelona/common";

export class MostLikedPostPublisher extends Publisher<MostLikedPostEvent> {
  readonly subject = Subjects.PostMostLiked;
}
