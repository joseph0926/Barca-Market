import {
  changePassword,
  forgotPassword,
  resetPassword,
} from '@auth/controllers/password';
import { login } from '@auth/controllers/signin';
import { createUser } from '@auth/controllers/signup';
import { verifyEmail } from '@auth/controllers/verify-email';
import express, { Router } from 'express';

const router: Router = express.Router();

export const authRoutes = (): Router => {
  router.post('/signup', createUser);
  router.post('/signin', login);
  router.put('/verify-email', verifyEmail);
  router.put('/forgot-password', forgotPassword);
  router.put('/reset-password/:token', resetPassword);
  router.put('/change-password', changePassword);

  return router;
};
