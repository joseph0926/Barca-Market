import { Request, Response } from "express";
import { Post } from "../models/post";
import { NotFoundError } from "@joseph0926-barcelona/common";
import { PostLikedPublisher } from "../events/publishers/post-liked-publisher";
import { natsWrapper } from "../nats-wrapper";

export const postLike = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    throw new NotFoundError();
  }

  new PostLikedPublisher(natsWrapper.client).publish({
    id: post.id,
    userId: req.currentUser!.id,
  });

  res.status(201).json([{ post, message: "글에 좋아요가 추가되었습니다." }]);
};

export const deleteLike = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    throw new NotFoundError();
  }

  new PostLikedPublisher(natsWrapper.client).publish({
    id: post.id,
    userId: req.currentUser!.id,
  });

  res.status(200).json([{ post, message: "좋아요를 취소하였습니다." }]);
};
