import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@joseph0926-barcelona/common";
import { Post } from "../models/post";

const router = express.Router();

router.post(
  "/api/post",
  requireAuth,
  [body("content").not().isEmpty().withMessage("내용을 작성해주세요.")],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { content, hashtags, images, isPrivate } = req.body;

      const post = Post.build({
        content,
        isPrivate,
        hashtags,
        images,
        userId: req.currentUser!.id,
      });
      await post.save();

      res.status(200).json([{ post, message: "글 작성에 성공하였습니다." }]);
    } catch (error) {
      console.log(error);
    }
  }
);

export { router as createPostRouter };
