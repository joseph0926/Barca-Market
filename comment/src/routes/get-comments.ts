import express from "express";
import { requireAuth } from "@joseph0926-barcelona/common";
import { getComments } from "../controllers/get-comments-controller";

const router = express.Router();

router.get("/api/comment/post/:postId", requireAuth, getComments);

export { router as getCommentRouter };
