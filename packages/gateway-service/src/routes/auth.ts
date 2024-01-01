import { PasswordController } from '@gateway/controllers/auth/password.controller';
import { SeedController } from '@gateway/controllers/auth/seed';
import { SigninController } from '@gateway/controllers/auth/signin.controller';
import { SignoutController } from '@gateway/controllers/auth/signout.controller';
import { SignupController } from '@gateway/controllers/auth/signup.controller';
import { VerifyEmailController } from '@gateway/controllers/auth/verify-email.controller';
import express, { Router } from 'express';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', SignupController.prototype.createUser);
    this.router.post('/auth/signin', SigninController.prototype.login);
    this.router.post('/auth/signout', SignoutController.prototype.update);
    this.router.put(
      '/auth/verify-email',
      VerifyEmailController.prototype.verifyEmail,
    );
    this.router.put(
      '/auth/forgot-password',
      PasswordController.prototype.forgotPassword,
    );
    this.router.put(
      '/auth/reset-password/:token',
      PasswordController.prototype.resetPassword,
    );
    this.router.put(
      '/auth/change-password',
      PasswordController.prototype.changePassword,
    );
    this.router.put('/auth/seed/:count', SeedController.prototype.create);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
