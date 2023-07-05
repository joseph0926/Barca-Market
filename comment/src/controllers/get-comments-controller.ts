import { Request, Response } from "express";
import { Comment } from "../models/comment";
import { Post } from "../models/post";
import { NotFoundError } from "@joseph0926-barcelona/common";

export const getComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      throw new NotFoundError();
    }

    const parentComments = await Comment.find({
      post: post.id,
      parentId: { $exists: false },
    }).populate("replys");

    res
      .status(200)
      .json([
        { comments: parentComments, message: "모든 댓글을 불러왔습니다." },
      ]);
  } catch (error) {
    console.log(error);
  }
};
