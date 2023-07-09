import { postsByViewsKey, postsKey } from "../../redis/keys";
import { redisClient } from "../../redis/client";
import { postDeserialize } from "../deserialize";

export const postsByViews = async (
  order: "DESC" | "ASC" = "DESC",
  offset = 0,
  count = 10
) => {
  let results: any = await redisClient.sort(postsByViewsKey(), {
    GET: [
      "#",
      `${postsKey("*")}->content`,
      `${postsKey("*")}->views`,
      `${postsKey("*")}->userId`,
      `${postsKey("*")}->totalComments`,
      `${postsKey("*")}->likes`,
    ],
    BY: "nosort",
    DIRECTION: order,
    LIMIT: {
      offset,
      count,
    },
  });

  const posts = [];
  while (results.length) {
    const [id, content, views, userId, totalComments, likes, ...rest] = results;
    const post = postDeserialize(id, {
      content,
      views,
      userId,
      totalComments,
      likes,
    });
    posts.push(post);
    results = rest;
  }

  return posts;
};
