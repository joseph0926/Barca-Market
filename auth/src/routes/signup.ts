import express from "express";
import { body } from "express-validator";
import { signupController } from "../controllers/signup-controller";
import { validateRequest } from "../middlewares/vaildate-request";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("이메일 형식이 올바르지 않습니다."),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("비밀번호는 4자리 이상 20자리 이하여야 합니다."),
    body("name")
      .trim()
      .isLength({ min: 4, max: 10 })
      .withMessage("닉네임은 4자리 이상 10자리 이하여야 합니다."),
  ],
  validateRequest,
  signupController
);

export { router as signupRouter };
