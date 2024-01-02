import { FC, ReactElement } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { ISellerGig } from '@/features/gigs/interfaces/gig.interface';
import { useGetGigsBySellerIdQuery, useGetSellerPausedGigsQuery } from '@/features/gigs/services/gigs.service';
import { IOrderDocument } from '@/features/order/interfaces/order.interface';
import { useGetOrdersBySellerIdQuery } from '@/features/order/services/order.service';
import DashboardHeader from '@/shared/header/DashboardHeader';

import { ISellerDocument } from '../../interfaces/seller.interface';
import { useSellerQuery } from '../../hooks/useSellerQuery';

const Seller: FC = (): ReactElement => {
  const { sellerId } = useParams<string>();
  const { sellerById, isSellerByIdSuccess } = useSellerQuery(`${sellerId}`);
  const { data: sellerGigs, isSuccess: isSellerGigsSuccess } = useGetGigsBySellerIdQuery(`${sellerId}`);
  const { data: sellerPausedGigs, isSuccess: isSellerPausedGigsSuccess } = useGetSellerPausedGigsQuery(`${sellerId}`);
  const { data: sellerOrders, isSuccess: isSellerOrdersSuccess } = useGetOrdersBySellerIdQuery(`${sellerId}`);
  let gigs: ISellerGig[] = [];
  let pausedGigs: ISellerGig[] = [];
  let orders: IOrderDocument[] = [];
  let seller: ISellerDocument | undefined = undefined;

  if (isSellerByIdSuccess) {
    seller = sellerById?.seller as ISellerDocument;
  }

  if (isSellerGigsSuccess) {
    gigs = sellerGigs?.gigs as ISellerGig[];
  }

  if (isSellerPausedGigsSuccess) {
    pausedGigs = sellerPausedGigs?.gigs as ISellerGig[];
  }

  if (isSellerOrdersSuccess) {
    orders = sellerOrders?.orders as IOrderDocument[];
  }

  return (
    <div className="relative w-screen">
      <DashboardHeader />
      <div className="relative m-auto min-h-screen w-screen px-6 xl:container md:px-12 lg:px-6">
        <Outlet context={{ seller, gigs, pausedGigs, orders }} />
      </div>
    </div>
  );
};

export default Seller;
