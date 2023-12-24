import { OrderController } from '@gateway/controllers/order/order.controller';
import express, { Router } from 'express';

class OrderRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.get(
      '/order/notification/:userTo',
      OrderController.prototype.getNotificationsController,
    );
    this.router.get(
      '/order/:orderId',
      OrderController.prototype.getOrderIdController,
    );
    this.router.get(
      '/order/seller/:sellerId',
      OrderController.prototype.getSellerOrdersController,
    );
    this.router.get(
      '/order/buyer/:buyerId',
      OrderController.prototype.getBuyerOrdersController,
    );
    this.router.post('/order', OrderController.prototype.createOrderController);
    this.router.post(
      '/order/create-payment-intent',
      OrderController.prototype.stripeIntent,
    );
    this.router.put(
      '/order/cancel/:orderId',
      OrderController.prototype.cancelOrderController,
    );
    this.router.put(
      '/order/extension/:orderId',
      OrderController.prototype.requestExtensionController,
    );
    this.router.put(
      '/order/deliver-order/:orderId',
      OrderController.prototype.deliverOrderController,
    );
    this.router.put(
      '/order/approve-order/:orderId',
      OrderController.prototype.approveOrderController,
    );
    this.router.put(
      '/order/gig/:type/:orderId',
      OrderController.prototype.deliveryDateController,
    );
    this.router.put(
      '/order/notification/mark-as-read',
      OrderController.prototype.markNotificationAsReadController,
    );

    return this.router;
  }
}

export const orderRoutes: OrderRoutes = new OrderRoutes();
