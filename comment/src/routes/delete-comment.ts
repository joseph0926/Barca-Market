import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@joseph0926-barcelona/common";
import { CommentDeletedPublisher } from "../events/publishers/comment-deleted-publisher";
import { natsWrapper } from "../nats-wrapper";
import { Comment } from "../models/comment";

const router = express.Router();

router.delete(
  "/api/post/:postId/comment/:commentId",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.commentId);
      if (!comment) {
        throw new NotFoundError();
      }

      new CommentDeletedPublisher(natsWrapper.client).publish({
        id: comment.id,
        postId: req.params.postId,
      });

      res.status(200).json([{ message: "댓글이 삭제되었습니다." }]);
    } catch (error) {
      console.log(error);
    }
  }
);

export { router as deleteCommentRouter };
