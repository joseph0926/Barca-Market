import { IAuthPayload } from '@base/interfaces/auth.interface';
import { User } from '@prisma/client';
import { Response } from 'express';

export interface IJWT {
  jwt?: string;
}

export interface IAuthMock {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  createdAt?: Date | string;
}

export const authUserPayload = {
  id: '1',
  username: 'test01',
  email: 'test01@test.com',
  iat: 123456789,
};

export const authMock: User | null = {
  id: '1',
  profilePublicId: '1231212312312312',
  username: 'test01',
  email: 'test01@test.com',
  country: 'Korea',
  profileImage: '',
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  passwordResetExpires: new Date(),
  emailVerificationToken: '',
  passwordResetToken: '',
  password: '12345678',
};

export const authMockRequest = (
  sessionData: IJWT,
  body: IAuthMock,
  currentUser?: IAuthPayload | null,
  params?: unknown,
) => ({
  session: sessionData,
  body,
  params,
  currentUser,
});

export const authMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
