import {
  getNotificationsById,
  markNotificationAsRead,
} from '@order/services/notification.service';
import { IOrderNotifcation } from '@base/interfaces/order.interface';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const getNotificationsController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const notifications: IOrderNotifcation[] = await getNotificationsById(
    req.params.userTo,
  );
  res.status(StatusCodes.OK).json({ message: 'Notifications', notifications });
};

const markSingleNotificationAsReadController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { notificationId } = req.body;
  const notification: IOrderNotifcation =
    await markNotificationAsRead(notificationId);
  res
    .status(StatusCodes.OK)
    .json({ message: 'Notification updated successfully.', notification });
};

export { getNotificationsController, markSingleNotificationAsReadController };
