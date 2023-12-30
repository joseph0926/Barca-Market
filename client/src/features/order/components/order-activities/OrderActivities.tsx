import { forwardRef, ForwardRefExoticComponent, RefAttributes, useState } from 'react';
import ChatBox from '@/features/chat/components/chatbox/ChatBox';
import { IChatBuyerProps, IChatSellerProps } from '@/features/chat/interfaces/chat.interface';
import { TimeAgo } from '@/shared/utils/timeago';

import { OrderContext } from '@/features/order/context/OrderContext';
import { DivElementRefType, IOrderActivitiesProps } from '@/features/order/interfaces/order.interface';
import OrderDelivered from '@/features/order/components/order-activities/components/OrderDelivered';
import OrderExtension from '@/features/order/components/order-activities/components/OrderExtension';
import OrderPlaced from '@/features/order/components/order-activities/components/OrderPlaced';
import OrderReview from '@/features/order/components/order-activities/components/OrderReview';

const OrderActivities: ForwardRefExoticComponent<Omit<IOrderActivitiesProps, 'ref'> & RefAttributes<HTMLDivElement>> = forwardRef<
  DivElementRefType,
  IOrderActivitiesProps
>((props, ref) => {
  const { order, authUser, viewDeliveryBtnClicked } = props;
  const [showChatBox, setShowChatBox] = useState<boolean>(false);
  const chatSeller: IChatSellerProps = {
    username: `${order.sellerUsername}`,
    _id: `${order.sellerId}`,
    profilePicture: `${order.sellerImage}`,
    responseTime: 1
  };
  const chatBuyer: IChatBuyerProps = {
    username: `${order.buyerUsername}`,
    _id: `${order.buyerId}`,
    profilePicture: `${order.buyerImage}`
  };

  return (
    <div className="mb-3 mt-4 rounded-[4px] bg-white p-3">
      <div className="flex">
        <div className="my-5 rounded-full bg-[#e8e8e8] px-4 py-2 text-center text-sm font-bold">
          {TimeAgo.chatMessageTransform(`${order.dateOrdered}`)}
        </div>
      </div>
      <OrderContext.Provider value={{ order, authUser, viewDeliveryBtnClicked }}>
        <OrderPlaced />
        <OrderExtension />
        <OrderDelivered ref={ref} />
        <OrderReview />
      </OrderContext.Provider>
      <div className="flex px-3 pt-2">
        If you need to contact the {order.buyerUsername === authUser.username ? 'seller' : 'buyer'},
        <div onClick={() => setShowChatBox((item: boolean) => !item)} className="cursor-pointer px-2 text-red-500 hover:underline">
          Go to Inbox
        </div>
      </div>
      {showChatBox && <ChatBox seller={chatSeller} buyer={chatBuyer} gigId={order.gigId} onClose={() => setShowChatBox(false)} />}
    </div>
  );
});

export default OrderActivities;
