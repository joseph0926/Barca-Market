import { currentUser, resendEmail } from '@auth/controllers/current-user';
import { refreshToken } from '@auth/controllers/refresh-token';
import express, { Router } from 'express';

const router: Router = express.Router();

export const currentUserRoutes = (): Router => {
  router.get('/currentuser', currentUser);
  router.get('/refresh-token/:username', refreshToken);
  router.post('resend-email', resendEmail);

  return router;
};
