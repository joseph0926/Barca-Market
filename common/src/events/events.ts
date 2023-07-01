import { Subjects } from "./subjects";

export interface PostCreatedEvent {
  subject: Subjects.PostCreated;
  data: {
    id: string;
    title: string;
    content: string;
    userId: string;
  };
}

export interface PostUpdatedEvent {
  subject: Subjects.PostUpdated;
  data: {
    id: string;
    title: string;
    content: string;
    userId: string;
  };
}
