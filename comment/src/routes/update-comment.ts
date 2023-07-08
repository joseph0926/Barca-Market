import express from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@joseph0926-barcelona/common";
import { updateComment } from "../controllers/update-comment-controller";

const router = express.Router();

router.put(
  "/api/post/:postId/comment/:commentId",
  requireAuth,
  [body("content").not().isEmpty().withMessage("내용을 작성해주세요.")],
  validateRequest,
  updateComment
);

export { router as updateCommentRouter };
