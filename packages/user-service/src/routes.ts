import { Application } from 'express';
import { verifyGatewayRequest } from '@base/gateway-middleware';
import { buyerRoutes } from '@user/routes/buyer';
import { healthRoutes } from '@user/routes/health';
import { sellerRoutes } from '@user/routes/seller';

const BUYER_BASE_PATH = '/api/v1/buyer';
const SELLER_BASE_PATH = '/api/v1/seller';

const appRoutes = (app: Application): void => {
  app.use('', healthRoutes());
  app.use(BUYER_BASE_PATH, verifyGatewayRequest, buyerRoutes());
  app.use(SELLER_BASE_PATH, verifyGatewayRequest, sellerRoutes());
};

export { appRoutes };
