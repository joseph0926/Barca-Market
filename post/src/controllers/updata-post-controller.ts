import { Request, Response } from "express";
import { Post } from "../models/post";
import {
  NotAuthorizedError,
  NotFoundError,
} from "@joseph0926-barcelona/common";
import { PostUpdatedPublisher } from "../events/publishers/post-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { content, hashtags, images, isPrivate } = req.body;

    const post = await Post.findById(req.params.postId);
    if (!post) {
      throw new NotFoundError();
    }

    if (!req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    post.set({
      content,
      hashtags,
      images,
      isPrivate,
    });
    await post.save();

    new PostUpdatedPublisher(natsWrapper.client).publish({
      id: post.id,
      content: post.content,
      isPrivate: post.isPrivate,
      hashtags: post.hashtags,
      images: post.images,
      userId: post.userId,
    });

    res.status(200).json([{ post, message: "글이 수정되었습니다." }]);
  } catch (error) {
    console.log(error);
  }
};
