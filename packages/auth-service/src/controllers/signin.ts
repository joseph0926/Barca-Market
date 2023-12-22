import { signinSchema } from '@auth/schemas/signin';
import { BadRequestError } from '@base/custom-error-handler';
import { Request, Response } from 'express';
import { isEmail } from '@base/helpers';
import { User } from '@prisma/client';
import {
  getAuthUserByEmail,
  getAuthUserByUsername,
  signToken,
} from '@auth/services/auth.service';
import { comparePassword } from '@auth/db/auth';
import { exclude } from '@auth/db/db';
import { StatusCodes } from 'http-status-codes';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { error } = await Promise.resolve(signinSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(
      error.details[0].message,
      'Signin login() method error',
    );
  }

  const { username, password } = req.body;

  const isValidEmail: boolean = isEmail(username);
  const existingUser: User | null = isValidEmail
    ? await getAuthUserByEmail(username)
    : await getAuthUserByUsername(username);
  if (!existingUser) {
    throw new BadRequestError(
      '인증 오류: 해당 이메일 또는 아이디로 가입된 정보를 찾을 수 없습니다.',
      'SignIn login() method error',
    );
  }

  const isPasswordMatch: boolean = await comparePassword(
    password,
    existingUser.password,
  );
  if (!isPasswordMatch) {
    throw new BadRequestError(
      '인증 오류: 잘못된 비밀번호입니다.',
      'SignIn login() method error',
    );
  }

  const userJWT: string = signToken(
    existingUser.id,
    existingUser.email,
    existingUser.username,
  );
  const userData: Omit<User, 'password'> | null = exclude(existingUser, [
    'password',
  ]);

  res
    .status(StatusCodes.OK)
    .json({ message: '로그인 성공', user: userData, token: userJWT });
};
