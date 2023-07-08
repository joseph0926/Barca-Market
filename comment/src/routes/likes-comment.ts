import express from "express";
import { requireAuth } from "@joseph0926-barcelona/common";
import { likesComment } from "../controllers/likes-comment-controller";

const router = express.Router();

router.post(
  " /api/post/:postId/comment/:commentId/like",
  requireAuth,
  likesComment
);

export { router as likesCommentRouter };
