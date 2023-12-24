import {
  createReview,
  getReviewsByGigIdController,
  getReviewsBySellerIdController,
} from '@review/controllers/review.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

const reviewRoutes = (): Router => {
  router.get('/gig/:gigId', getReviewsByGigIdController);
  router.get('/seller/:sellerId', getReviewsBySellerIdController);
  router.post('/', createReview);

  return router;
};

export { reviewRoutes };
