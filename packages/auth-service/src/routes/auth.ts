import { createUser } from '@auth/controllers/signup';
import express, { Router } from 'express';

const router: Router = express.Router();

export const authRoutes = (): Router => {
  router.post('/signup', createUser);

  return router;
};
