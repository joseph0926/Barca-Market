import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './custom-error-handler';

const tokens: string[] = [
  'auth',
  'seller',
  'gig',
  'search',
  'buyer',
  'message',
  'order',
  'review',
];

export function verifyGatewayRequset(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  if (req.headers?.gatewaytoken) {
    throw new NotAuthorizedError(
      '인증 오류',
      'verifyGatewayRequset(): Request not coming from api gateway'
    );
  }

  const token: string = req.headers?.gatewaytoken as string;
  if (!token) {
    throw new NotAuthorizedError(
      '인증 오류',
      'verifyGatewayRequset(): Request not coming from api gateway'
    );
  }

  try {
    const payload: { id: string; iat: number } = JWT.verify(token, '') as {
      id: string;
      iat: number;
    };
    if (!tokens.includes(payload.id)) {
      throw new NotAuthorizedError(
        '인증 오류',
        'verifyGatewayRequset(): Request payload is invalid'
      );
    }
  } catch (error) {
    throw new NotAuthorizedError(
      '인증 오류',
      'verifyGatewayRequset(): Request not coming from api gateway'
    );
  }

  next();
}
