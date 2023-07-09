import { redisClient } from "../redis/client";
import { userLikesKey, postsKey } from "../redis/keys";

export const userLikesPost = async (postId: string, userId: string) => {
  return redisClient.sIsMember(userLikesKey(userId), postId);
};

export const likedPosts = async (userId: string) => {
  const ids = await redisClient.sMembers(userLikesKey(userId));
};

export const likePost = async (postId: string, userId: string) => {
  const inserted = await redisClient.sAdd(userLikesKey(userId), postId);

  if (inserted) {
    return redisClient.hIncrBy(postsKey(postId), "likes", 1);
  }
};

export const unlikePost = async (postId: string, userId: string) => {
  const removed = await redisClient.sRem(userLikesKey(userId), postId);

  if (removed) {
    return redisClient.hIncrBy(postsKey(postId), "likes", -1);
  }
};
