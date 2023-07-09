import {
  Publisher,
  Subjects,
  MostViewsEvent,
} from "@joseph0926-barcelona/common";

export class MostViewsPublisher extends Publisher<MostViewsEvent> {
  readonly subject = Subjects.PostMostViews;
}
