import type { Post, Comment } from "../redis/types";
import { DateTime } from "luxon";

export const postDeserialize = (
  id: string,
  post: { [key: string]: string }
): Post => {
  return {
    id,
    content: post.content,
    images: post.images,
    isPrivate: post.isPrivate === "true" ? true : false,
    likes: +post.likes,
    reposts: +post.reports,
    totalComments: +post.totalComments,
    userId: post.userId,
    version: +post.version,
    createdAt: DateTime.fromMillis(+post.createdAt),
  };
};
