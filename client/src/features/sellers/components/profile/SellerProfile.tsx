import { FC, ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import GigViewReviews from '@/features/gigs/components/view/components/GigViewLeft/GigViewReviews';
import { ISellerGig } from '@/features/gigs/interfaces/gig.interface';
import { useGetGigsBySellerIdQuery } from '@/features/gigs/services/gigs.service';
import { IReviewDocument } from '@/features/order/interfaces/review.interface';
import { useGetReviewsBySellerIdQuery } from '@/features/order/services/review.service';
import Breadcrumb from '@/shared/Breadcrumb';
import GigCardDisplayItem from '@/shared/gigs/GigCardDisplayItem';
import CircularPageLoader from '@/shared/CircularPageLoader';
import { v4 as uuidv4 } from 'uuid';

import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import SellerOverview from './components/SellerOverview';
import { useSellerQuery } from '../../hooks/useSellerQuery';

const SellerProfile: FC = (): ReactElement => {
  const [type, setType] = useState<string>('Overview');
  const { sellerId } = useParams();
  const { sellerById, isSellerByIdLoading, isSellerByIdSuccess } = useSellerQuery(`${sellerId}`);
  const { data: gigData, isSuccess: isSellerGigSuccess, isLoading: isSellerGigLoading } = useGetGigsBySellerIdQuery(`${sellerId}`);
  const {
    data: sellerReviewsData,
    isSuccess: isGigReviewSuccess,
    isLoading: isGigReviewLoading
  } = useGetReviewsBySellerIdQuery(`${sellerId}`);
  let reviews: IReviewDocument[] = [];
  if (isGigReviewSuccess) {
    reviews = sellerReviewsData.reviews as IReviewDocument[];
  }

  const isLoading: boolean =
    isSellerGigLoading && isSellerByIdLoading && isGigReviewLoading && !isSellerByIdSuccess && !isSellerGigSuccess && !isGigReviewSuccess;

  return (
    <div className="relative w-full pb-6">
      <Breadcrumb breadCrumbItems={['Seller', `${sellerById && sellerById.seller ? sellerById.seller.username : ''}`]} />
      {isLoading ? (
        <CircularPageLoader />
      ) : (
        <div className="container mx-auto px-2 md:px-0">
          <ProfileHeader sellerProfile={sellerById?.seller} showHeaderInfo={true} showEditIcons={false} />
          <div className="my-4 cursor-pointer">
            <ProfileTabs type={type} setType={setType} />
          </div>

          <div className="flex flex-wrap bg-white">
            {type === 'Overview' && <SellerOverview sellerProfile={sellerById?.seller} showEditIcons={false} />}
            {type === 'Active Gigs' && (
              <div className="grid gap-x-6 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {gigData?.gigs &&
                  gigData?.gigs.map((gig: ISellerGig) => (
                    <GigCardDisplayItem key={uuidv4()} gig={gig} linkTarget={false} showEditIcon={false} />
                  ))}
              </div>
            )}
            {type === 'Ratings & Reviews' && <GigViewReviews showRatings={false} reviews={reviews} hasFetchedReviews={true} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
