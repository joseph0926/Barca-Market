import {
  BadRequestError,
  NotAuthorizedError,
} from '@base/custom-error-handler';
import { NextFunction, Request, Response } from 'express';
import { IAuthPayload } from '@base/interfaces/auth.interface';
import { verify } from 'jsonwebtoken';
import { config } from '@gateway/config';

class AuthMiddleware {
  public verifyUser(req: Request, _res: Response, next: NextFunction): void {
    if (!req.session?.jwt) {
      throw new NotAuthorizedError(
        'Token is not available, Please login again',
        'GatewayService verifyUser() method',
      );
    }

    try {
      const payload: IAuthPayload = verify(
        req.session?.jwt,
        `${config.JWT_TOKEN}`,
      ) as IAuthPayload;
      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError(
        'Token is not available, Please login again',
        'GatewayService verifyUser() method',
      );
    }
    next();
  }

  public checkAuthentication(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): void {
    if (!req.currentUser) {
      throw new BadRequestError(
        'Authentication is reqired to access this route',
        'GatewayService checkAuthentication() method',
      );
    }
    next();
  }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();
