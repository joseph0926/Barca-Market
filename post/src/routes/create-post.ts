import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@joseph0926-barcelona/common";
import { Post } from "../models/post";
import { PostCreatedPublisher } from "../events/publishers/post-created-publisher";
import { natsWrapper } from "../nats-wrapper";

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

      new PostCreatedPublisher(natsWrapper.client).publish({
        id: post.id,
        content: post.content,
        isPrivate: post.isPrivate,
        hashtags: post.hashtags,
        images: post.images,
        userId: post.userId,
        version: post.version,
      });

      res.status(201).json([{ post, message: "글 작성에 성공하였습니다." }]);
    } catch (error) {
      console.log(error);
    }
  }
);

export { router as createPostRouter };
