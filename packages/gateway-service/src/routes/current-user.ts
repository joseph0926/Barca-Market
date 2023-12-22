import { CurrentUserController } from '@gateway/controllers/auth/current-user';
import { authMiddleware } from '@gateway/services/auth-middleware';
import express, { Router } from 'express';

class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/auth/currentUser',
      authMiddleware.checkAuthentication,
      CurrentUserController.prototype.currentUser,
    );
    this.router.get(
      '/auth/resend-email',
      authMiddleware.checkAuthentication,
      CurrentUserController.prototype.resendEmail,
    );
    return this.router;
  }
}

export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes();
