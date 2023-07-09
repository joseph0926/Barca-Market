import { postsKey, postsByViewsKey } from "../redis/keys";
import { redisClient } from "../redis/client";

export const incrementView = async (postId: string) => {
  return Promise.all([
    redisClient.hIncrBy(postsKey(postId), "views", 1),
    redisClient.zIncrBy(postsByViewsKey(), 1, postId),
  ]);
};
