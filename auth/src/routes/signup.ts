import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("이메일 형식이 올바르지 않습니다."),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("비밀번호는 4자리 이상 20자리 이하여야 합니다."),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    console.log("회원가입 성공!");
    throw new DatabaseConnectionError();

    res.send({});
  }
);

export { router as signupRouter };
