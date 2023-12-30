import { FC, ReactElement } from 'react';

import GigPackage from '@/features/gigs/components/view/components/GigViewRight/GigPackage';
import GigRelatedTags from '@/features/gigs/components/view/components/GigViewRight/GigRelatedTags';
import GigSeller from '@/features/gigs/components/view/components/GigViewRight/GigSeller';

const GigViewRight: FC = (): ReactElement => {
  return (
    <>
      <GigPackage />
      <GigSeller />
      <GigRelatedTags />
    </>
  );
};

export default GigViewRight;
