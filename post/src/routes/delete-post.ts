import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@joseph0926-barcelona/common";
import { Post } from "../models/post";
import { PostDeletedPublisher } from "../events/publishers/post-deleted-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.delete(
  "/api/post/:postId",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.postId);
      if (!post) {
        throw new NotFoundError();
      }

      new PostDeletedPublisher(natsWrapper.client).publish({
        id: post.id,
      });

      res.status(200).json([{ message: "글이 삭제되었습니다." }]);
    } catch (error) {
      console.log(error);
    }
  }
);

export { router as deletePostRouter };
