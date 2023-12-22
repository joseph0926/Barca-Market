import { SigninController } from '@gateway/controllers/auth/signin.controller';
import { SignupController } from '@gateway/controllers/auth/signup.controller';
import express, { Router } from 'express';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', SignupController.prototype.createUser);
    this.router.post('/auth/signup', SigninController.prototype.login);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
