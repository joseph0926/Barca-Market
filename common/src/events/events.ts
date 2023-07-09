import type { DateTime } from "luxon";
import { Subjects } from "./subjects";

export interface PostCreatedEvent {
  subject: Subjects.PostCreated;
  data: {
    id: string;
    content: string;
    likes: number;
    reposts: number;
    images: string;
    hashtags?: string[];
    totalComments: number;
    isPrivate: boolean;
    userId: string;
    version: number;
    comments?: string[];
    views: number;
    createdAt: DateTime;
  };
}

export interface PostUpdatedEvent {
  subject: Subjects.PostUpdated;
  data: {
    id: string;
    content: string;
    images: string;
    hashtags?: string[];
    totalComments: number;
    isPrivate: boolean;
    userId: string;
    version: number;
    comments?: string[];
    createdAt: DateTime;
  };
}

export interface PostDeletedEvent {
  subject: Subjects.PostDeleted;
  data: {
    id: string;
  };
}

export interface PostLikedEvent {
  subject: Subjects.PostLiked;
  data: {
    id: string;
    userId: string;
  };
}

export interface PostViewEvent {
  subject: Subjects.PostView;
  data: {
    id: string;
    userId: string;
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
    postId: string;
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
    postId: string;
  };
}

export interface CommentDeletedEvent {
  subject: Subjects.CommentDeleted;
  data: {
    id: string;
    postId: string;
  };
}

export interface CommentLikedEvent {
  subject: Subjects.CommentLiked;
  data: {
    id: string;
    userId: string;
    postId: string;
  };
}
