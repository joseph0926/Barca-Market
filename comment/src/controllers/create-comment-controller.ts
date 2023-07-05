import { Request, Response } from "express";
import mongoose from "mongoose";
import { NotFoundError } from "@joseph0926-barcelona/common";
import { Post } from "../models/post";
import { Comment } from "../models/comment";
import { CommentCreatedPublisher } from "../events/publishers/comment-created-publisher";
import { natsWrapper } from "../nats-wrapper";

export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, parentId, postId } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFoundError();
    }

    let parentComment;
    if (parentId) {
      parentComment = await Comment.findById(parentId);
      if (!parentComment) {
        throw new NotFoundError();
      }
    }

    const comment = Comment.build({
      content,
      parentId: parentId || undefined,
      userId: req.currentUser!.id,
      post,
    });
    await comment.save();

    if (parentComment) {
      parentComment.replys.push(comment.id);
      await parentComment.save();
    }

    new CommentCreatedPublisher(natsWrapper.client).publish({
      id: comment.id,
      content: comment.content,
      parentId: comment.parentId,
      userId: comment.userId,
      version: comment.version,
      post: {
        id: comment.post.id,
      },
    });

    res.status(201).json([{ comment, message: "댓글 작성에 성공하였습니다." }]);
  } catch (error) {
    console.log(error);
  }
};
