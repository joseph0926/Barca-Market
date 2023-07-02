import { Request, Response } from "express";
import { Post } from "../models/post";
import { NotFoundError } from "@joseph0926-barcelona/common";

interface Query {
  content?: {
    $regex: string;
    $options: string;
  };
}

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { sort } = req.query;

    const search = typeof req.query.search === "string" ? req.query.search : "";

    const queryObj: Query = {};

    if (search) {
      queryObj.content = { $regex: search, $options: "i" };
    }

    let result = Post.find(queryObj);
    if (!result) {
      throw new NotFoundError();
    }
    if (sort === "likes-desc") {
      result = result.sort("totalLikes");
    }
    if (sort === "likes-asc") {
      result = result.sort("-totalLikes");
    }
    if (sort === "comment-desc") {
      result = result.sort("totalComments");
    }
    if (sort === "comment-asc") {
      result = result.sort("-totalComments");
    }

    const posts = await result;

    res.status(201).json([{ posts, message: "모든 글을 불러왔습니다." }]);
  } catch (error) {
    console.log(error);
  }
};
