import { BuyerController } from '@gateway/controllers/user/buyer.controller';
import { authMiddleware } from '@gateway/services/auth-middleware';
import express, { Router } from 'express';

class BuyerRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/buyer/email',
      authMiddleware.checkAuthentication,
      BuyerController.prototype.getBuyerByCurrentUserEmail,
    );
    this.router.get(
      '/buyer/username',
      authMiddleware.checkAuthentication,
      BuyerController.prototype.getBuyerByCurrentUserUsername,
    );
    this.router.get(
      '/buyer/:username',
      authMiddleware.checkAuthentication,
      BuyerController.prototype.getBuyerUserByUsername,
    );
    return this.router;
  }
}

export const buyerRoutes: BuyerRoutes = new BuyerRoutes();
