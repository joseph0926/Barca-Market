import { Request, Response } from "express";

import prisma from "../db/connectDB";
import { BadRequestError } from "../errors/bad-request-error";
import { comparePassword } from "../util/password";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { createJwtToken } from "../util/jwt";

export const signinController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!existingUser) {
    throw new BadRequestError(
      "해당 이메일로 가입된 사용자를 찾을 수 없습니다."
    );
  }

  const isEqule = await comparePassword(existingUser.password, password);
  if (!isEqule) {
    throw new BadRequestError("비밀번호가 일치하지 않습니다.");
  }

  if (!existingUser.isVerified) {
    throw new NotAuthorizedError();
  }

  const userJwt = createJwtToken({
    id: existingUser.id,
    email: existingUser.email,
  });
  req.session = {
    jwt: userJwt,
  };

  const user: Partial<typeof existingUser> = {
    ...existingUser,
  };
  delete user.password;

  res.status(200).json({ user, message: "로그인에 성공하였습니다." });
};
