import { FC, ReactElement, useEffect } from 'react';
import { ISellerGig } from '@/features/gigs/interfaces/gig.interface';
import { useGetGigsByCategoryQuery, useGetTopRatedGigsByCategoryQuery } from '@/features/gigs/services/gigs.service';
import { ISellerDocument } from '@/features/sellers/interfaces/seller.interface';
import TopGigsView from '@/shared/gigs/TopGigsView';
import { lowerCase } from '@/shared/utils/utils.service';
import { socketService } from '@/sockets/socket.service';
import { useAppSelector } from '@/store/store';
import { IReduxState } from '@/store/store.interface';

import FeaturedExperts from './FeaturedExperts';
import HomeGigsView from './HomeGigsView';
import HomeSlider from './HomeSlider';
import { useSellerQuery } from '@/features/sellers/hooks/useSellerQuery';

const Home: FC = (): ReactElement => {
  const authUser = useAppSelector((state: IReduxState) => state.authUser);

  const { randomSeller, isRandomSellerSuccess } = useSellerQuery('10');
  const { data: categoryData, isSuccess: isCategorySuccess } = useGetGigsByCategoryQuery(`${authUser.username}`);
  const { data: topGigsData, isSuccess: isTopGigsSuccess } = useGetTopRatedGigsByCategoryQuery(`${authUser.username}`);

  let sellers: ISellerDocument[] = [];
  let categoryGigs: ISellerGig[] = [];
  let topGigs: ISellerGig[] = [];

  if (isRandomSellerSuccess) {
    sellers = randomSeller.sellers as ISellerDocument[];
  }

  if (isCategorySuccess) {
    categoryGigs = categoryData.gigs as ISellerGig[];
  }

  if (isTopGigsSuccess) {
    topGigs = topGigsData.gigs as ISellerGig[];
  }

  useEffect(() => {
    socketService.setupSocketConnection();
  }, []);

  return (
    <div className="relative m-auto min-h-screen w-screen px-6 xl:container md:px-12 lg:px-6">
      <HomeSlider />
      {topGigs.length > 0 && (
        <TopGigsView
          gigs={topGigs}
          title="Top rated services in"
          subTitle={`Highest rated talents for all your ${lowerCase(topGigs[0].categories)} needs.`}
          category={topGigs[0].categories}
          width="w-72"
          type="home"
        />
      )}
      {categoryGigs.length > 0 && (
        <HomeGigsView gigs={categoryGigs} title="Because you viewed a gig on" subTitle="" category={categoryGigs[0].categories} />
      )}
      <FeaturedExperts sellers={sellers} />
    </div>
  );
};

export default Home;
