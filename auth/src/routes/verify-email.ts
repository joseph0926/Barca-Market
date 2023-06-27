import express from "express";
import { veifyEmailController } from "../controllers/verify-email-controller";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/users/verify-email",
  [body("email").isEmail().withMessage("이메일 형식이 올바르지 않습니다.")],
  veifyEmailController
);

export { router as verifyEmailRouter };
