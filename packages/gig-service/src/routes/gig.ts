import {
  createGigController,
  getGigByIdController,
  getSellerGigsController,
  getSellerPausedGigsController,
  searchGigsController,
  getTopRatedGigsByCategoryController,
  getUserSelectedGigCategoryController,
  getMoreGigsLikeThisController,
  updateGigController,
  updateGigActiveController,
  seedGigsController,
  deleteGigController,
} from '@gig/controllers/gig.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

const gigRoutes = (): Router => {
  router.get('/:gigId', getGigByIdController);
  router.get('/seller/:sellerId', getSellerGigsController);
  router.get('/seller/pause/:sellerId', getSellerPausedGigsController);
  router.get('/search/:from/:size/:type', searchGigsController);
  router.get('/category/:username', getUserSelectedGigCategoryController);
  router.get('/top/:username', getTopRatedGigsByCategoryController);
  router.get('/similar/:gigId', getMoreGigsLikeThisController);
  router.post('/create', createGigController);
  router.put('/:gigId', updateGigController);
  router.put('/active/:gigId', updateGigActiveController);
  router.put('/seed/:count', seedGigsController);
  router.delete('/:gigId/:sellerId', deleteGigController);

  return router;
};

export { gigRoutes };
