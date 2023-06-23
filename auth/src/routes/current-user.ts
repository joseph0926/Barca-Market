import express, { Request, Response } from "express";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    res
      .status(201)
      .json([
        {
          currentUser: req.currentUser || null,
          message: "유저 정보를 불러오는데 성공하였습니다.",
        },
      ]);
  }
);

export { router as currentUserRouter };
