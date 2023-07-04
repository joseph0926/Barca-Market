import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@joseph0926-barcelona/common";
import { Post } from "../models/post";
import { getPosts } from "../controllers/get-posts-controller";

const router = express.Router();

router.get("/api/post", getPosts);

router.get(
  "/api/post/:postId",
  requireAuth,
  async (req: Request, res: Response) => {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      throw new NotFoundError();
    }
    res.status(200).json([{ post, message: "해당 글을 불러왔습니다." }]);
  }
);

export { router as getPostRouter };
