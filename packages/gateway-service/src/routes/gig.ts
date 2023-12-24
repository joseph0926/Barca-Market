import { GigController } from '@gateway/controllers/gig/gig.controller';
import { authMiddleware } from '@gateway/services/auth-middleware';
import express, { Router } from 'express';

class GigRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/gig/:gigId',
      authMiddleware.checkAuthentication,
      GigController.prototype.getGigByIdController,
    );
    this.router.get(
      '/gig/seller/:sellerId',
      authMiddleware.checkAuthentication,
      GigController.prototype.getSellerGigsController,
    );
    this.router.get(
      '/gig/seller/pause/:sellerId',
      authMiddleware.checkAuthentication,
      GigController.prototype.getSellerPausedGigsController,
    );
    this.router.get(
      '/gig/search/:from/:size/:type',
      authMiddleware.checkAuthentication,
      GigController.prototype.searchGigsController,
    );
    this.router.get(
      '/gig/category/:username',
      authMiddleware.checkAuthentication,
      GigController.prototype.getUserSelectedGigCategoryController,
    );
    this.router.get(
      '/gig/top/:username',
      authMiddleware.checkAuthentication,
      GigController.prototype.getTopRatedGigsByCategoryController,
    );
    this.router.get(
      '/gig/similar/:gigId',
      authMiddleware.checkAuthentication,
      GigController.prototype.getMoreGigsLikeThisController,
    );
    this.router.post(
      '/gig/create',
      authMiddleware.checkAuthentication,
      GigController.prototype.createGigController,
    );
    this.router.put(
      '/gig/:gigId',
      authMiddleware.checkAuthentication,
      GigController.prototype.updateGigController,
    );
    this.router.put(
      '/gig/active/:gigId',
      authMiddleware.checkAuthentication,
      GigController.prototype.updateGigActiveController,
    );
    this.router.put(
      '/gig/seed/:count',
      authMiddleware.checkAuthentication,
      GigController.prototype.seedGigsController,
    );
    this.router.delete(
      '/gig/:gigId/:sellerId',
      authMiddleware.checkAuthentication,
      GigController.prototype.deleteGigController,
    );
    return this.router;
  }
}

export const gigRoutes: GigRoutes = new GigRoutes();
