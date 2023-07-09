import type { PostAttrs, CommentAttrs } from "../redis/types";

export const postSerialize = (attrs: PostAttrs) => {
  return {
    ...attrs,
    createdAt: attrs.createdAt.toMillis(),
  };
};

export const commentSerialize = (attrs: CommentAttrs) => {
  return {
    ...attrs,
    createdAt: attrs.createdAt.toMillis(),
  };
};
