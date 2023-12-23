import {
  getAuthUserById,
  getAuthUserByVerificationToken,
  updateVerifyEmailField,
} from '@auth/services/auth.service';
import { BadRequestError } from '@base/custom-error-handler';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const verifyEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { token } = req.body;

  const existingUser = await getAuthUserByVerificationToken(token);
  if (!existingUser) {
    throw new BadRequestError(
      '인증 오류: 유효하지 않은 토큰입니다.',
      'VerifyEmail verifyEmail() method error',
    );
  }

  await updateVerifyEmailField(existingUser.id, true);

  const updatedUser = await getAuthUserById(existingUser.id);

  res
    .status(StatusCodes.OK)
    .json({ message: '이메일 인증 성공', user: updatedUser });
};
