import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@joseph0926-barcelona/common";
import { Post } from "../models/post";

const router = express.Router();

router.delete(
  "/api/commnet/:commentId",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const comment = await Post.findByIdAndDelete(req.params.commentId);
      if (!comment) {
        throw new NotFoundError();
      }

      res.status(200).json([{ message: "글이 삭제되었습니다." }]);
    } catch (error) {
      console.log(error);
    }
  }
);

export { router as deleteCommentRouter };
