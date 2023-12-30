import { FC, ReactElement, useContext, useState } from 'react';
import { FaArrowRight, FaRegClock } from 'react-icons/fa';
import { createSearchParams, NavigateFunction, useNavigate } from 'react-router-dom';
import { GigContext } from '@/features/gigs/context/GigContext';
import { IOffer } from '@/features/order/interfaces/order.interface';
import Button from '@/shared/Button';
import ApprovalModal from '@/shared/modals/ApprovalModal';
import { IApprovalModalContent } from '@/shared/interfaces/modal.interface';
import { useAppSelector } from '@/store/store';
import { IReduxState } from '@/store/store.interface';

const GigPackage: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const { gig } = useContext(GigContext);
  const [approvalModalContent, setApprovalModalContent] = useState<IApprovalModalContent>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  const continueToCheck = () => {
    const deliveryInDays: number = parseInt(gig.expectedDelivery.split(' ')[0]);
    const newDate: Date = new Date();
    newDate.setDate(newDate.getDate() + deliveryInDays);
    const offerParams: IOffer = {
      gigTitle: gig.title,
      description: gig.basicDescription,
      price: gig.price,
      deliveryInDays,
      oldDeliveryDate: `${newDate}`,
      newDeliveryDate: `${newDate}`,
      accepted: false,
      cancelled: false
    };
    navigate(`/gig/checkout/${gig.id}?${createSearchParams({ offer: JSON.stringify(offerParams) })}`, { state: gig });
  };

  return (
    <>
      {showModal && <ApprovalModal approvalModalContent={approvalModalContent} hideCancel={true} onClick={() => setShowModal(false)} />}
      <div className="border-grey mb-8 border">
        <div className="flex border-b px-4 py-2">
          <h4 className="font-bold">${gig.price}</h4>
        </div>
        <ul className="mb-0 list-none px-4 py-2">
          <li className="flex justify-between">
            <div className="ml-15 flex w-full pb-3">
              <div className="text-base font-bold">{gig.basicTitle}</div>
            </div>
          </li>
          <li className="flex justify-between">
            <div className="ml-15 flex w-full pb-4">
              <div className="text-sm font-normal">{gig.basicDescription}</div>
            </div>
          </li>
          <li className="flex justify-between">
            <div className="ml-15 flex w-full pb-3">
              <FaRegClock className="flex self-center" /> <span className="ml-3 text-sm font-semibold">{gig.expectedDelivery}</span>
            </div>
          </li>
          <li className="flex justify-between">
            <div className="ml-15 flex w-full py-1">
              <Button
                disabled={authUser.username === gig.username}
                className={`text-md flex w-full justify-between rounded bg-orange-500 px-8 py-2 font-bold text-white focus:outline-none
                ${authUser.username === gig.username ? 'cursor-not-allowed opacity-20' : 'cursor-pointer hover:bg-orange-400'}
                `}
                label={
                  <>
                    <span className="w-full">Continue</span>
                    <FaArrowRight className="flex self-center" />
                  </>
                }
                onClick={() => {
                  if (authUser && !authUser.emailVerified) {
                    setApprovalModalContent({
                      header: 'Email Verification Notice',
                      body: 'Please verify your email before you continue.',
                      btnText: 'OK',
                      btnColor: 'bg-orange-500 hover:bg-orange-400'
                    });
                    setShowModal(true);
                  } else {
                    continueToCheck();
                  }
                }}
              />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default GigPackage;
