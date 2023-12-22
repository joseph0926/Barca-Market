import { Request, Response } from 'express';
import {
  authMock,
  authMockRequest,
  authMockResponse,
  authUserPayload,
} from '@auth/controllers/test/mocks/auth.mocks';
import { currentUser, resendEmail } from '@auth/controllers/current-user';
import * as auth from '@auth/services/auth.service';
import { PrismaClient } from '@prisma/client';
import { BadRequestError } from '@base/custom-error-handler';

jest.mock('@prisma/client');
jest.mock('@base/custom-error-handler');
jest.mock('@auth/services/auth.service');
jest.mock('@auth/queues/auth.producer');
jest.mock('@elastic/elasticsearch');

const USERNAME = 'test01';
const PASSWORD = '12345678';

let prisma: PrismaClient;

describe('CurrentUser', () => {
  beforeEach(async () => {
    jest.resetAllMocks();
    prisma = new PrismaClient();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await prisma.$disconnect();
  });

  describe('currentUser method', () => {
    it('should return authenticated user', async () => {
      const req: Request = authMockRequest(
        {},
        { username: USERNAME, password: PASSWORD },
        authUserPayload,
      ) as unknown as Request;
      const res: Response = authMockResponse();
      jest.spyOn(auth, 'getAuthUserById').mockResolvedValue(authMock);

      await currentUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Authenticated user',
        user: authMock,
      });
    });

    it('should return empty user', async () => {
      const req: Request = authMockRequest(
        {},
        { username: USERNAME, password: PASSWORD },
        authUserPayload,
      ) as unknown as Request;
      const res: Response = authMockResponse();
      jest.spyOn(auth, 'getAuthUserById').mockResolvedValue({} as never);

      await currentUser(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Authenticated user',
        user: null,
      });
    });
  });

  describe('resendEmail method', () => {
    it('should call BadRequestError for invalid email', async () => {
      const req: Request = authMockRequest(
        {},
        { username: USERNAME, password: PASSWORD },
        authUserPayload,
      ) as unknown as Request;
      const res: Response = authMockResponse();
      jest.spyOn(auth, 'getAuthUserByEmail').mockResolvedValue({} as never);

      resendEmail(req, res).catch(() => {
        expect(BadRequestError).toHaveBeenCalledWith(
          'Email is invalid',
          'CurrentUser resentEmail() method error',
        );
      });
    });

    it('should call updateVerifyEmailField method', async () => {
      const req: Request = authMockRequest(
        {},
        { username: USERNAME, password: PASSWORD },
        authUserPayload,
      ) as unknown as Request;
      const res: Response = authMockResponse();
      jest.spyOn(auth, 'getAuthUserByEmail').mockResolvedValue(authMock);

      await resendEmail(req, res);
      expect(auth.updateVerifyEmailField).toHaveBeenCalled();
    });

    it('should return authenticated user', async () => {
      const req: Request = authMockRequest(
        {},
        { username: USERNAME, password: PASSWORD },
        authUserPayload,
      ) as unknown as Request;
      const res: Response = authMockResponse();
      jest.spyOn(auth, 'getAuthUserByEmail').mockResolvedValue(authMock);
      jest.spyOn(auth, 'getAuthUserById').mockResolvedValue(authMock);

      await resendEmail(req, res);
      expect(auth.updateVerifyEmailField).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Email verification sent',
        user: authMock,
      });
    });
  });
});
