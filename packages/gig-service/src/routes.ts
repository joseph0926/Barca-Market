import { Application } from 'express';
import { verifyGatewayRequset } from '@base/gateway-middleware';

const BASE_PATH = '/api/v1/gig';

const appRoutes = (app: Application): void => {
  app.use('', () => console.log('아직 정의 안되어있음!!!!!'));
  app.use(BASE_PATH, verifyGatewayRequset, () =>
    console.log('gig 아직 정의 안되어있음!!!!!'),
  );
  app.use(BASE_PATH, verifyGatewayRequset, () =>
    console.log('search 아직 정의 안되어있음!!!!!'),
  );
};

export { appRoutes };
