import { FC, ReactElement } from 'react';
import { IProfileTabsProps } from '@/features/sellers/interfaces/seller.interface';
import Dropdown from '@/shared/Dropdown';

const ProfileTabs: FC<IProfileTabsProps> = ({ type, setType }): ReactElement => {
  return (
    <>
      <div className="border-grey bg-white sm:hidden">
        <Dropdown text={type} maxHeight="300" values={['Overview', 'Active Gigs', 'Ratings & Reviews']} setValue={setType} />
      </div>
      <ul className="hidden divide-x divide-gray-200 text-center text-sm font-medium text-gray-500 shadow sm:flex dark:text-gray-400">
        <li className="w-full">
          <div
            onClick={() => {
              if (setType) {
                setType('Overview');
              }
            }}
            className={`inline-block w-full p-4 text-gray-600 hover:text-gray-700 focus:outline-none
              ${type === 'Overview' ? 'bg-orange-200' : 'bg-white'}
            `}
          >
            Overview
          </div>
        </li>
        <li className="w-full">
          <div
            onClick={() => {
              if (setType) {
                setType('Active Gigs');
              }
            }}
            className={`inline-block w-full p-4 text-gray-600 hover:text-gray-700 focus:outline-none
              ${type === 'Active Gigs' ? 'bg-orange-200' : 'bg-white'}
            `}
          >
            Active Gigs
          </div>
        </li>
        <li className="w-full">
          <div
            onClick={() => {
              if (setType) {
                setType('Ratings & Reviews');
              }
            }}
            className={`inline-block w-full p-4 text-gray-600 hover:text-gray-700 focus:outline-none
              ${type === 'Ratings & Reviews' ? 'bg-orange-200' : 'bg-white'}
            `}
          >
            Ratings & Reviews
          </div>
        </li>
      </ul>
    </>
  );
};

export default ProfileTabs;
