import { getAuthUserByUsername, signToken } from '@auth/services/auth.service';
import { BadRequestError } from '@base/custom-error-handler';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const refreshToken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const existingUser = await getAuthUserByUsername(req.params.username);
  if (!existingUser) {
    throw new BadRequestError(
      '인증 오류: 해당 아이디로 가입된 정보를 찾을 수 없습니다.',
      'RefreshToken refreshToken() method error',
    );
  }
  const userJWT = signToken(
    existingUser.id,
    existingUser.email,
    existingUser.username,
  );

  res
    .status(StatusCodes.OK)
    .json({ meesage: 'Refresh Token', user: existingUser, token: userJWT });
};
