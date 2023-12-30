import { orderBy } from 'lodash';
import { FC, ReactElement, useEffect, useState } from 'react';
import { FaRegEnvelope, FaRegEnvelopeOpen } from 'react-icons/fa';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { IOrderNotifcation } from '@/features/order/interfaces/order.interface';
import { useGetNotificationsByIdQuery, useMarkUnreadNotificationMutation } from '@/features/order/services/notification.service';
import { TimeAgo } from '@/shared/utils/timeago';
import { showErrorToast } from '@/shared/utils/utils.service';
import { useAppSelector } from '@/store/store';
import { IReduxState } from '@/store/store.interface';
import { v4 as uuidv4 } from 'uuid';

import { IHomeHeaderProps } from '@/shared/interfaces/header.interface';

const NotificationDropdown: FC<IHomeHeaderProps> = ({ setIsNotificationDropdownOpen }): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const [notifications, setNotifications] = useState<IOrderNotifcation[]>([]);
  const navigate: NavigateFunction = useNavigate();
  const { data, isSuccess } = useGetNotificationsByIdQuery(`${authUser.username}`, { refetchOnMountOrArgChange: true });
  const [markUnReadNotification] = useMarkUnreadNotificationMutation();

  const markNotificationAsRead = async (notificationId: string): Promise<void> => {
    try {
      await markUnReadNotification(notificationId).unwrap();
    } catch (error) {
      showErrorToast('Error');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const sortedNotifications: IOrderNotifcation[] = orderBy(data.notifications, ['createdAt'], ['desc']) as IOrderNotifcation[];
      setNotifications(sortedNotifications);
    }
  }, [isSuccess, data?.notifications]);

  return (
    <div className="border-grey border-grey z-20 flex max-h-[470px] flex-col justify-between rounded border bg-white shadow-md">
      <div className="border-grey block border-b px-4 py-2 text-center font-medium text-gray-700">Notifications</div>
      <div className="h-96 overflow-y-scroll">
        {notifications.length > 0 &&
          notifications.map((data: IOrderNotifcation) => (
            <div
              key={uuidv4()}
              className="border-grey max-h-[90px] border-b py-2 text-left hover:bg-gray-50"
              onClick={() => {
                if (setIsNotificationDropdownOpen) {
                  setIsNotificationDropdownOpen(false);
                }
                navigate(`/orders/${data.orderId}/activities`);
                markNotificationAsRead(`${data._id}`);
              }}
            >
              <div className="flex px-4">
                <div className="mt-1 flex-shrink-0">
                  <img
                    className="h-11 w-11 rounded-full object-cover"
                    src={data.senderUsername === authUser?.username ? data.receiverPicture : data.senderPicture}
                    alt=""
                  />
                </div>
                <div className="w-full pl-3 pt-2">
                  <div className="flex justify-between text-[13px] font-normal leading-4">
                    <div className="w-[85%] font-normal">
                      <span className="pr-1 font-bold">
                        {data.senderUsername === authUser?.username ? data.receiverUsername : data.senderUsername}
                      </span>
                      {data.message}
                    </div>
                    {!data.isRead ? (
                      <FaRegEnvelope className="mt-1 text-orange-400" />
                    ) : (
                      <FaRegEnvelopeOpen className="mt-1 text-gray-200" />
                    )}
                  </div>
                  <div className="flex gap-2 text-[11px]">
                    <span className="font-normal text-[#b5b6ba]">{TimeAgo.transform(data?.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {notifications.length === 0 && <div className="flex h-full items-center justify-center">No notifications to show</div>}
      </div>
    </div>
  );
};

export default NotificationDropdown;
