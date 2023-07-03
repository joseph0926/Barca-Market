import { Subjects } from "./subjects";

export interface PostCreatedEvent {
  subject: Subjects.PostCreated;
  data: {
    id: string;
    content: string;
    images?: string[];
    hashtags?: string[];
    isPrivate: boolean;
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
