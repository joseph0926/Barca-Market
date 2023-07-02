import express from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@joseph0926-barcelona/common";
import { updatePost } from "../controllers/updata-post-controller";

const router = express.Router();

router.put(
  "/api/post/:postId",
  requireAuth,
  [body("content").not().isEmpty().withMessage("내용을 작성해주세요.")],
  validateRequest,
  updatePost
);

export { router as updatePostRouter };
