import express from "express";
import { requireAuth } from "@joseph0926-barcelona/common";
import { deleteLike, postLike } from "../controllers/likes-controller";

const router = express.Router();

router.post("/api/post/:postId/likes", requireAuth, postLike);
router.delete("/api/post/:postId/likes", requireAuth, deleteLike);

export { router as likesRouter };
