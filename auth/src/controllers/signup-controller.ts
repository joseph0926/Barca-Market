import { Request, Response } from "express";
import prisma from "../db/connectDB";
import crypto from "crypto";

import { BadRequestError } from "../errors/bad-request-error";
import { sendVerificationEmail } from "../util/send-verification-email";
import { hashPassword } from "../util/password";

export const signupController = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const existingEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingEmail) {
    throw new BadRequestError("이미 사용중인 이메일입니다.");
  }

  // 처음 가입자 -> 관리자
  const isFirstUser = (await prisma.user.count()) === 0;
  const role = isFirstUser ? "ADMIN" : "USER";

  // 이메일 확인전 임시 토큰
  const verificationToken = crypto.randomBytes(40).toString("hex");

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      verificationToken,
    },
  });

  // 확인 이메일
  const origin = req.get("origin") || "http://localhost:3000";
  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken!,
    origin,
  });

  res.status(200).json([{ message: "회원가입 성공! 이메일을 확인해주세요." }]);
};
