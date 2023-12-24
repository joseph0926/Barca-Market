import { ReviewController } from '@gateway/controllers/review/review.controller';
import { authMiddleware } from '@gateway/services/auth-middleware';
import express, { Router } from 'express';

class ReviewRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/review/gig/:gigId',
      authMiddleware.checkAuthentication,
      ReviewController.prototype.getReviewsByGigIdController,
    );
    this.router.get(
      '/review/seller/:sellerId',
      authMiddleware.checkAuthentication,
      ReviewController.prototype.getReviewsBySellerIdController,
    );
    this.router.post(
      '/review',
      authMiddleware.checkAuthentication,
      ReviewController.prototype.createReviewController,
    );
    return this.router;
  }
}

export const reviewRoutes: ReviewRoutes = new ReviewRoutes();
