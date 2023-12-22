import { Application } from 'express';
import { authRoutes } from '@auth/routes/auth';
import { verifyGatewayRequset } from '@base/gateway-middleware';
import { currentUserRoutes } from './routes/current-user';

const BASE_PATH = '/api/v1/auth';

export const appRoutes = (app: Application): void => {
  app.use(BASE_PATH, verifyGatewayRequset, authRoutes());
  app.use(BASE_PATH, verifyGatewayRequset, currentUserRoutes());
};
