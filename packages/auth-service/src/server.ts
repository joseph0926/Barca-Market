import { Logger } from 'winston';
import { Application, NextFunction, Request, Response } from 'express';
import hpp from 'hpp';
import helmet from 'helmet';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { winstonLogger } from '@base/logger';
import { config } from '@auth/config';
import { verify } from 'jsonwebtoken';
import { IAuthPayload } from '@base/interfaces/auth.interface';

const SERVER_PORT = 4002;
const log: Logger = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  'authenticationServer',
  'debug',
);

export const start = (app: Application): void => {};

const securityMiddleware = (app: Application): void => {
  app.set('trust proxy', 1);
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: config.API_GATEWAY_URL,
      credentials: true,
      methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    }),
  );
  app.use((req: Request, _res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      const payload = verify(token, config.JWT_TOKEN!) as IAuthPayload;
      req.currentUser = payload;
    }
    next();
  });
};
