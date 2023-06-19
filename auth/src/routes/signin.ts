import express from "express";
import { body } from "express-validator";

import { validateRequest } from "../middlewares/vaildate-request";
import { verifiyEmail } from "../middlewares/verifiy-email";
import { signinController } from "../controllers/signin-controller";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("이메일 형식이 올바르지 않습니다."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("비밀번호가 유효하지 않습니다."),
  ],
  validateRequest,
  verifiyEmail,
  signinController
);

export { router as signinRouter };
