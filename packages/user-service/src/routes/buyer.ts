import {
  getBuyerByCurrentUserEmail,
  getBuyerByCurrentUserUsername,
  getBuyerUserByUsername,
} from '@user/controllers/buyer.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

const buyerRoutes = (): Router => {
  router.get('/email', getBuyerByCurrentUserEmail);
  router.get('/username', getBuyerByCurrentUserUsername);
  router.get('/:username', getBuyerUserByUsername);

  return router;
};

export { buyerRoutes };
