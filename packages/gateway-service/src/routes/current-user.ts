import { CurrentUserController } from '@gateway/controllers/auth/current-user.controller';
import { RefreshTokenController } from '@gateway/controllers/auth/refresh-token.controller';
import { authMiddleware } from '@gateway/services/auth-middleware';
import express, { Router } from 'express';

class CurrentUserRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/auth/currentuser',
      authMiddleware.checkAuthentication,
      CurrentUserController.prototype.currentUser,
    );
    this.router.get(
      '/auth/refresh-token/:username',
      authMiddleware.checkAuthentication,
      RefreshTokenController.prototype.refreshToken,
    );
    this.router.post(
      '/auth/resend-email',
      authMiddleware.checkAuthentication,
      CurrentUserController.prototype.resendEmail,
    );
    this.router.get('/auth/logged-in-user', authMiddleware.checkAuthentication, CurrentUserController.prototype.getLoggedInUsers);
    this.router.delete('/auth/logged-in-user/:username', authMiddleware.checkAuthentication, CurrentUserController.prototype.removeLoggedInUser);
    
    return this.router;
  }
}

export const currentUserRoutes: CurrentUserRoutes = new CurrentUserRoutes();
