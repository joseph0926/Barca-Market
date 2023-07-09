import type { DateTime } from "luxon";
import { Subjects } from "./subjects";

export interface PostCreatedEvent {
  subject: Subjects.PostCreated;
  data: {
    id: string;
    version: number;
    content: string;
    images?: string[];
    hashtags?: string[];
    views: number;
    isPrivate: boolean;
    userId: string;
    comments?: string[];
    createdAt: DateTime;
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
    comments?: string[];
  };
}

export interface PostDeletedEvent {
  subject: Subjects.PostDeleted;
  data: {
    id: string;
  };
}

export interface CommentCreatedEvent {
  subject: Subjects.CommentCreated;
  data: {
    id: string;
    version: number;
    content: string;
    views: number;
    parentId?: string;
    userId: string;
    post: {
      id: string;
    };
    createdAt: DateTime;
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

export interface CommentDeletedEvent {
  subject: Subjects.CommentDeleted;
  data: {
    id: string;
    post: {
      id: string;
    };
  };
}
