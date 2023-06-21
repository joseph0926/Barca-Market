import { Request, Response, NextFunction } from "express";
import prisma from "../db/connectDB";
import { BadRequestError } from "../errors/bad-request-error";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const verifiyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, verificationToken } = req.body;

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
  if (
    !existingUser.isVerified &&
    existingUser.verificationToken !== verificationToken
  ) {
    throw new NotAuthorizedError();
  }

  try {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        isVerified: true,
        verified: new Date(),
        verificationToken: "",
      },
    });
  } catch (error) {
    console.log(error);
  }
  next();
};
