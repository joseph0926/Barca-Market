import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@joseph0926-barcelona/common";
import mongoose from "mongoose";
import { Comment } from "../models/comment";

const router = express.Router();

router.post(
  "/api/comment/:commentId/reports",
  requireAuth,
  async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        throw new NotFoundError();
      }

      comment.reports.push(req.currentUser!.id);
      comment.totalReports = comment.reports.length;

      await comment.save();
      await session.commitTransaction();

      res.status(200).json({ message: "댓글이 신고되었습니다." });
    } catch (error) {
      await session.abortTransaction();
      console.log(error);
    } finally {
      session.endSession();
    }
  }
);

export { router as reportCommentRouter };
