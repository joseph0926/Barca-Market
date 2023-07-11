import { postsByLikesKey, postsKey } from "../../redis/keys";
import { redisClient } from "../../redis/client";

export const postsByLikes = async (
  order: "DESC" | "ASC" = "DESC",
  offset = 0,
  count = 10
) => {
  let results: any = await redisClient.sort(postsByLikesKey(), {
    GET: ["#"],
    BY: "nosort",
    DIRECTION: order,
    LIMIT: {
      offset,
      count,
    },
  });

  const posts: string[] = [];
  while (results.length) {
    const [id, ...rest] = results;
    posts.push(id);
    results = rest;
  }

  return posts;
};
