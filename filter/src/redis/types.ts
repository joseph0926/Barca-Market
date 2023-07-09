import type { DateTime } from "luxon";

export interface Post {
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
  createdAt: DateTime;
}

export interface PostAttrs {
  id: string;
  version: number;
  content: string;
  images?: string;
  hashtags?: string[];
  isPrivate: boolean;
  userId: string;
  comments?: string[];
  createdAt: DateTime;
}

export interface Comment {
  id: string;
  content: string;
  parentId: string;
  replys?: string[];
  likes: number;
  reports: number;
  userId: string;
  postId: string;
  version: number;
  createdAt: DateTime;
}

export interface CommentAttrs {
  id: string;
  version: number;
  content: string;
  parentId?: string;
  userId: string;
  postId: string;
  createdAt: DateTime;
}
