import { Subjects } from "./subjects";

export interface PostCreatedEvent {
  subject: Subjects.PostCreated;
  data: {
    id: string;
    version: number;
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
    version: number;
    content: string;
    images?: string[];
    hashtags?: string[];
    isPrivate: boolean;
    userId: string;
    commentId?: string;
  };
}

export interface CommentCreatedEvent {
  subject: Subjects.CommentCreated;
  data: {
    id: string;
    version: number;
    content: string;
    parentId?: string;
    userId: string;
    post: {
      id: string;
    };
  };
}

export interface CommentUpdatedEvent {
  subject: Subjects.Commentupdated;
  data: {
    id: string;
    version: number;
    content: string;
    parentId?: string;
    userId: string;
    post: {
      id: string;
    };
  };
}
