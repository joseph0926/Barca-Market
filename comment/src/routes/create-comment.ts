import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { body } from "express-validator";
import {
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@joseph0926-barcelona/common";
import { Post } from "../models/post";
import { Comment } from "../models/comment";
import { createComment } from "../controllers/create-comment-controller";

const router = express.Router();

router.post(
  "/api/comment",
  requireAuth,
  [
    body("content").not().isEmpty().withMessage("내용을 작성해주세요."),
    body("parentId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("상위 댓글의 ID를 제공해주세요."),
  ],
  validateRequest,
  createComment
);

export { router as createCommentRouter };
