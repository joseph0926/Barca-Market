import { SignupController } from '@gateway/controllers/auth/signup.controller';
import express, { Router } from 'express';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/auth/signup', SignupController.prototype.createUser);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
