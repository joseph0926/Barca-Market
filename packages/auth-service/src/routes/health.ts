import { healthController } from '@auth/controllers/health.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

export const healthRoutes = (): Router => {
  router.get('/auth-health', healthController);

  return router;
};
