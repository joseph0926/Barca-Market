import { FC, ReactElement } from 'react';
import { FaCircleNotch } from 'react-icons/fa';

const CircularPageLoader: FC = (): ReactElement => {
  return (
    <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white/[0.8]">
      <FaCircleNotch className="mr-3 h-10 w-10 animate-spin" size={40} color="#ff6450" />
    </div>
  );
};

export default CircularPageLoader;
