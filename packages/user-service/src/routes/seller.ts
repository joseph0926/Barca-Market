import {
  seedSeller,
  getSellerByIdController,
  getSellerByUsernameController,
  getRandomSellersController,
  createSellerController,
  updateSellerController,
} from '@user/controllers/seller.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

const sellerRoutes = (): Router => {
  router.get('/id/:sellerId', getSellerByIdController);
  router.get('/username/:username', getSellerByUsernameController);
  router.get('/random/:size', getRandomSellersController);
  router.post('/create', createSellerController);
  router.put('/:sellerId', updateSellerController);
  router.put('/seed/:count', seedSeller);

  return router;
};

export { sellerRoutes };
