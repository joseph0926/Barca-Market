import { Request, Response } from "express";
import prisma from "../db/connectDB";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { BadRequestError } from "../errors/bad-request-error";

export const veifyEmailController = async (req: Request, res: Response) => {
  const { email, verificationToken } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new BadRequestError(
      "해당 이메일로 가입된 사용자를 찾을 수 없습니다."
    );
  }

  if (user.verificationToken !== verificationToken) {
    throw new NotAuthorizedError();
  }

  user.isVerified = true;
  user.verified = new Date();
  user.verificationToken = "";

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verified: new Date(),
        verificationToken: "",
      },
    });
  } catch (error) {
    console.log(error);
  }

  res.status(201).json([{ message: "이메일 인증 성공!" }]);
};
