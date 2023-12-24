import { orderService } from '@gateway/services/api/order.service';
import { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export class OrderController {
  public async getOrderIdController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await orderService.getOrderById(
      req.params.orderId,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async getSellerOrdersController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await orderService.sellerOrders(
      req.params.sellerId,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, orders: response.data.orders });
  }

  public async getBuyerOrdersController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await orderService.buyerOrders(
      req.params.buyerId,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, orders: response.data.orders });
  }

  public async getNotificationsController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await orderService.getNotifications(
      req.params.userTo,
    );
    res.status(StatusCodes.OK).json({
      message: response.data.message,
      notifications: response.data.notifications,
    });
  }

  public async stripeIntent(req: Request, res: Response): Promise<void> {
    const response: AxiosResponse = await orderService.createOrderIntent(
      req.body.price,
      req.body.buyerId,
    );
    res.status(StatusCodes.CREATED).json({
      message: response.data.message,
      clientSecret: response.data.clientSecret,
      paymentIntentId: response.data.paymentIntentId,
    });
  }

  public async createOrderController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const response: AxiosResponse = await orderService.createOrder(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async cancelOrderController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { orderId } = req.params;
    const { orderData, paymentIntentId } = req.body;
    const response: AxiosResponse = await orderService.cancelOrder(
      paymentIntentId,
      orderId,
      orderData,
    );
    res.status(StatusCodes.CREATED).json({ message: response.data.message });
  }

  public async requestExtensionController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { orderId } = req.params;
    const response: AxiosResponse =
      await orderService.requestDeliveryDateExtension(orderId, req.body);
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async deliveryDateController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { orderId, type } = req.params;
    const response: AxiosResponse = await orderService.updateDeliveryDate(
      orderId,
      type,
      req.body,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async deliverOrderController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { orderId } = req.params;
    const response: AxiosResponse = await orderService.deliverOrder(
      orderId,
      req.body,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async approveOrderController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { orderId } = req.params;
    const response: AxiosResponse = await orderService.approveOrder(
      orderId,
      req.body,
    );
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, order: response.data.order });
  }

  public async markNotificationAsReadController(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { notificationId } = req.body;
    const response: AxiosResponse =
      await orderService.markNotificationAsRead(notificationId);
    res.status(StatusCodes.OK).json({
      message: response.data.message,
      notification: response.data.notification,
    });
  }
}
