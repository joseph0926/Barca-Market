import { Request, Response } from "express";
import { Post } from "../models/post";
import {
  NotAuthorizedError,
  NotFoundError,
} from "@joseph0926-barcelona/common";

export const postLike = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    throw new NotFoundError();
  }

  if (!req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  const alreadyLiked = post.likes.includes(req.currentUser!.id);
  if (!alreadyLiked) {
    post.likes.push(req.currentUser!.id);
    post.totalLikes++;
    await post.save();
  }

  res.status(201).json([{ post, message: "글에 좋아요가 추가되었습니다." }]);
};

export const deleteLike = async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.postId);
  if (!post) {
    throw new NotFoundError();
  }

  if (!req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  const alreadyLiked = post.likes.includes(req.currentUser!.id);
  if (alreadyLiked) {
    const idx = post.likes.indexOf(req.currentUser!.id);
    post.likes.splice(idx, 1);
    post.totalLikes--;
    await post.save();
  }

  res.status(200).json([{ post, message: "좋아요를 취소하였습니다." }]);
};
