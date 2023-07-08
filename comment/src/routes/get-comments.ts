import express from "express";
import { requireAuth } from "@joseph0926-barcelona/common";
import { getComments } from "../controllers/get-comments-controller";

const router = express.Router();

router.get("/api/post/:postId/comment", requireAuth, getComments);

export { router as getCommentRouter };
