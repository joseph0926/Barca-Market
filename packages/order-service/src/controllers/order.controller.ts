import {
  IDeliveredWork,
  IOrderDocument,
} from '@base/interfaces/order.interface';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import {
  approveDeliveryDate,
  approveOrder,
  cancelOrder,
  createOrder,
  getOrderByOrderId,
  getOrdersByBuyerId,
  getOrdersBySellerId,
  rejectDeliveryDate,
  requestDeliveryExtension,
  sellerDeliverOrder,
} from '@order/services/order.service';
import Stripe from 'stripe';
import { orderSchema, orderUpdateSchema } from '@order/schemas/order';
import { BadRequestError } from '@base/custom-error-handler';
import { config } from '@order/config';
import { UploadApiResponse } from 'cloudinary';
import { uploads } from '@base/cloudinary-upload';
import crypto from 'crypto';

const getOrderIdController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const order: IOrderDocument = await getOrderByOrderId(req.params.orderId);
  res.status(StatusCodes.OK).json({ message: 'Order by order id', order });
};

const getSellerOrdersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const orders: IOrderDocument[] = await getOrdersBySellerId(
    req.params.sellerId,
  );
  res.status(StatusCodes.OK).json({ message: 'Seller orders', orders });
};

const getBuyerOrdersController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const orders: IOrderDocument[] = await getOrdersByBuyerId(req.params.buyerId);
  res.status(StatusCodes.OK).json({ message: 'Buyer orders', orders });
};

const stripe: Stripe = new Stripe(config.STRIPE_API_KEY!, {
  typescript: true,
});

const stripeIntent = async (req: Request, res: Response): Promise<void> => {
  const customer: Stripe.Response<Stripe.ApiSearchResult<Stripe.Customer>> =
    await stripe.customers.search({
      //@ts-ignore
      query: `email:"${req.currentUser!.email}"`,
    });
  let customerId = '';
  if (customer.data.length === 0) {
    const createdCustomer: Stripe.Response<Stripe.Customer> =
      await stripe.customers.create({
        //@ts-ignore
        email: `${req.currentUser!.email}`,
        metadata: {
          buyerId: `${req.body.buyerId}`,
        },
      });
    customerId = createdCustomer.id;
  } else {
    customerId = customer.data[0].id;
  }

  let paymentIntent: Stripe.Response<Stripe.PaymentIntent>;
  if (customerId) {
    const serviceFee: number =
      req.body.price < 50
        ? (5.5 / 100) * req.body.price + 2
        : (5.5 / 100) * req.body.price;
    paymentIntent = await stripe.paymentIntents.create({
      amount: Math.floor((req.body.price + serviceFee) * 100),
      currency: 'usd',
      customer: customerId,
      automatic_payment_methods: { enabled: true },
    });
  }
  res.status(StatusCodes.CREATED).json({
    message: 'Order intent created successfully.',
    clientSecret: paymentIntent!.client_secret,
    paymentIntentId: paymentIntent!.id,
  });
};

const createOrderController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error } = await Promise.resolve(orderSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(
      error.details[0].message,
      'Create order() method',
    );
  }
  const serviceFee: number =
    req.body.price < 50
      ? (5.5 / 100) * req.body.price + 2
      : (5.5 / 100) * req.body.price;
  let orderData: IOrderDocument = req.body;
  orderData = { ...orderData, serviceFee };
  const order: IOrderDocument = await createOrder(orderData);
  res
    .status(StatusCodes.CREATED)
    .json({ message: 'Order created successfully.', order });
};

const cancelOrderController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  await stripe.refunds.create({
    payment_intent: `${req.body.paymentIntent}`,
  });
  const { orderId } = req.params;
  await cancelOrder(orderId, req.body.orderData);
  res.status(StatusCodes.OK).json({ message: 'Order cancelled successfully.' });
};

const requestExtensionController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error } = await Promise.resolve(orderUpdateSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(
      error.details[0].message,
      'Update requestExtension() method',
    );
  }
  const { orderId } = req.params;
  const order: IOrderDocument = await requestDeliveryExtension(
    orderId,
    req.body,
  );
  res.status(StatusCodes.OK).json({ message: 'Order delivery request', order });
};

const deliveryDateController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { error } = await Promise.resolve(orderUpdateSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(
      error.details[0].message,
      'Update deliveryDate() method',
    );
  }
  const { orderId, type } = req.params;
  const order: IOrderDocument =
    type === 'approve'
      ? await approveDeliveryDate(orderId, req.body)
      : await rejectDeliveryDate(orderId);
  res
    .status(StatusCodes.OK)
    .json({ message: 'Order delivery date extension', order });
};

const buyerApproveOrderController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { orderId } = req.params;
  const order: IOrderDocument = await approveOrder(orderId, req.body);
  res
    .status(StatusCodes.OK)
    .json({ message: 'Order approved successfully.', order });
};

const deliverOrderController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { orderId } = req.params;
  let file: string = req.body.file;
  const randomBytes: Buffer = await Promise.resolve(crypto.randomBytes(20));
  const randomCharacters: string = randomBytes.toString('hex');
  let result: UploadApiResponse;
  if (file) {
    result = (
      req.body.fileType === 'zip'
        ? await uploads(file, `${randomCharacters}.zip`)
        : await uploads(file)
    ) as UploadApiResponse;
    if (!result.public_id) {
      throw new BadRequestError(
        'File upload error. Try again',
        'Update deliverOrder() method',
      );
    }
    file = result?.secure_url;
  }
  const deliveredWork: IDeliveredWork = {
    message: req.body.message,
    file,
    fileType: req.body.fileType,
    fileName: req.body.fileName,
    fileSize: req.body.fileSize,
  };
  const order: IOrderDocument = await sellerDeliverOrder(
    orderId,
    true,
    deliveredWork,
  );
  res
    .status(StatusCodes.OK)
    .json({ message: 'Order delivered successfully.', order });
};

export {
  getBuyerOrdersController,
  getOrderIdController,
  getSellerOrdersController,
  stripeIntent,
  createOrderController,
  deliverOrderController,
  buyerApproveOrderController,
  deliveryDateController,
  requestExtensionController,
  cancelOrderController,
};
