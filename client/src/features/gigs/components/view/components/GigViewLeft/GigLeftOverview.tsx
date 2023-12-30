import { FC, ReactElement, useContext } from 'react';
import { FaCircleNotch } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { GigContext } from '@/features/gigs/context/GigContext';

const GigLeftOverview: FC = (): ReactElement => {
  const { gig, isSuccess, isLoading } = useContext(GigContext);

  return (
    <div className="relative flex h-[600px] max-h-[600px] cursor-pointer justify-center bg-[#F5F5F5]">
      {!isLoading && isSuccess && (
        <LazyLoadImage
          src={gig.coverImage}
          alt="Gig Image"
          className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
          placeholderSrc="https://placehold.co/330x220?text=Profile+Image"
          effect="blur"
        />
      )}
      {isLoading && !isSuccess && (
        <div className="flex h-[600px] w-full transition-all duration-500 hover:scale-105">
          <FaCircleNotch className="mr-3 flex h-10 w-full animate-spin self-center" size={40} color="#ff6450" />
        </div>
      )}
    </div>
  );
};

export default GigLeftOverview;
