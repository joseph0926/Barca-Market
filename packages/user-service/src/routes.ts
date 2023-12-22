import { Application } from 'express';
import { verifyGatewayRequset } from '@base/gateway-middleware';

const BUYER_BASE_PATH = '/api/v1/buyer';
const SELLER_BASE_PATH = '/api/v1/seller';

const appRoutes = (app: Application): void => {
  app.use('', () => console.log('app'));
  app.use(BUYER_BASE_PATH, verifyGatewayRequset, () => console.log('app'));
  app.use(SELLER_BASE_PATH, verifyGatewayRequset, () => console.log('app'));
};

export { appRoutes };
