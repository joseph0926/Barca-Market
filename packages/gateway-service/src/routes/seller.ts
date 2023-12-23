import { SellerController } from '@gateway/controllers/user/seller.controller';
import { authMiddleware } from '@gateway/services/auth-middleware';
import express, { Router } from 'express';

class SellerRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/seller/id/:sellerId',
      authMiddleware.checkAuthentication,
      SellerController.prototype.getSellerByIdController,
    );
    this.router.get(
      '/seller/username/:username',
      authMiddleware.checkAuthentication,
      SellerController.prototype.getSellerByUsernameController,
    );
    this.router.get(
      '/seller/random/:size',
      SellerController.prototype.getRandomSellersController,
    );
    this.router.post(
      '/seller/create',
      authMiddleware.checkAuthentication,
      SellerController.prototype.createSellerController,
    );
    this.router.put(
      '/seller/:sellerId',
      authMiddleware.checkAuthentication,
      SellerController.prototype.updateSellerController,
    );
    this.router.put(
      '/seller/seed/:count',
      authMiddleware.checkAuthentication,
      SellerController.prototype.seedSeller,
    );
    return this.router;
  }
}

export const sellerRoutes: SellerRoutes = new SellerRoutes();
