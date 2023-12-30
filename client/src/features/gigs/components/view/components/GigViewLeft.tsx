import { FC, ReactElement } from 'react';

import GigLeftAbout from '@/features/gigs/components/view/components/GigViewLeft/GigLeftAbout';
import GigLeftOverview from '@/features/gigs/components/view/components/GigViewLeft/GigLeftOverview';
import GigViewReviews from '@/features/gigs/components/view/components/GigViewLeft/GigViewReviews';

const GigViewLeft: FC = (): ReactElement => {
  return (
    <>
      <GigLeftOverview />
      <GigLeftAbout />
      <GigViewReviews showRatings={true} hasFetchedReviews={false} />
    </>
  );
};

export default GigViewLeft;
