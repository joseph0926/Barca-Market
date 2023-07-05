import { Request, Response } from "express";
import {
  NotAuthorizedError,
  NotFoundError,
} from "@joseph0926-barcelona/common";
import { Comment } from "../models/comment";
import { CommentUpdatedPublisher } from "../events/publishers/comment-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      throw new NotFoundError();
    }

    if (comment.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    comment.content = content || comment.content;
    await comment.save();

    new CommentUpdatedPublisher(natsWrapper.client).publish({
      id: comment.id,
      content: comment.content,
      parentId: comment.parentId,
      userId: comment.userId,
      version: comment.version,
      post: {
        id: comment.post.id,
      },
    });

    res.status(200).json([{ comment, message: "댓글 수정에 성공하였습니다." }]);
  } catch (error) {
    console.log(error);
  }
};
