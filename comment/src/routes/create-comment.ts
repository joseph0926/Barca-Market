import express from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@joseph0926-barcelona/common";
import { createComment } from "../controllers/create-comment-controller";

const router = express.Router();

router.post(
  "/api/comment/:postId",
  requireAuth,
  [body("content").not().isEmpty().withMessage("내용을 작성해주세요.")],
  validateRequest,
  createComment
);

export { router as createCommentRouter };
