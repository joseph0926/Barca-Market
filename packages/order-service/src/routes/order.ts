import { getNotificationsController } from '@order/controllers/notification.controller';
import {
  buyerApproveOrderController,
  cancelOrderController,
  createOrderController,
  deliverOrderController,
  deliveryDateController,
  getBuyerOrdersController,
  getOrderIdController,
  getSellerOrdersController,
  requestExtensionController,
  stripeIntent,
} from '@order/controllers/order.controller';
import { markNotificationAsRead } from '@order/services/notification.service';
import express, { Router } from 'express';

const router: Router = express.Router();

const orderRoutes = (): Router => {
  router.get('/notification/:userTo', getNotificationsController);
  router.get('/:orderId', getOrderIdController);
  router.get('/seller/:sellerId', getSellerOrdersController);
  router.get('/buyer/:buyerId', getBuyerOrdersController);
  router.post('/', createOrderController);
  router.post('/create-payment-intent', stripeIntent);
  router.put('/cancel/:orderId', cancelOrderController);
  router.put('/extension/:orderId', requestExtensionController);
  router.put('/deliver-order/:orderId', deliverOrderController);
  router.put('/approve-order/:orderId', buyerApproveOrderController);
  router.put('/gig/:type/:orderId', deliveryDateController);
  router.put('/notification/mark-as-read', markNotificationAsRead);

  return router;
};

export { orderRoutes };
