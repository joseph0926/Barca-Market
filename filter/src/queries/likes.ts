import { redisClient } from "../redis/client";
import { userLikesKey, postsKey, postsByLikesKey } from "../redis/keys";

export const userLikesPost = async (postId: string, userId: string) => {
  return redisClient.sIsMember(userLikesKey(userId), postId);
};

export const likedPosts = async (userId: string) => {
  const ids = await redisClient.sMembers(userLikesKey(userId));
  return ids;
};

export const likePost = async (postId: string, userId: string) => {
  const inserted = await redisClient.sAdd(userLikesKey(userId), postId);

  if (inserted) {
    return Promise.all([
      redisClient.hIncrBy(postsKey(postId), "likes", 1),
      redisClient.zIncrBy(postsByLikesKey(), 1, postId),
    ]);
  }
};

export const unlikePost = async (postId: string, userId: string) => {
  const removed = await redisClient.sRem(userLikesKey(userId), postId);

  if (removed) {
    return Promise.all([
      redisClient.hIncrBy(postsKey(postId), "likes", 1),
      redisClient.zIncrBy(postsByLikesKey(), -1, postId),
    ]);
  }
};

export const getLikes = async (postId: string) => {
  const likes = await redisClient.hGet(postsKey(postId), "likes");
  return likes ? parseInt(likes, 10) : 0;
};
