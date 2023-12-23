import { healthController } from '@user/controllers/health.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

export const healthRoutes = (): Router => {
  router.get('/user-health', healthController);

  return router;
};
