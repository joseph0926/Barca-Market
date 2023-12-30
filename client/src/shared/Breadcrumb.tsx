import { FC, ReactElement } from 'react';
import { FaAngleRight, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { IBreadCrumbProps } from '@/shared/interfaces/shared.interface';

const Breadcrumb: FC<IBreadCrumbProps> = ({ breadCrumbItems }): ReactElement => {
  return (
    <nav className="flex bg-orange-500 px-5 py-6 text-white">
      <ol className="container mx-auto inline-flex items-center space-x-1 px-6 md:space-x-3 md:px-12 lg:px-6">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-bold uppercase text-white hover:text-red-600 dark:text-white dark:hover:text-white"
          >
            <FaHome className="mr-2 h-4 w-4" />
            Home
          </Link>
        </li>

        {breadCrumbItems.map((item: string) => (
          <div key={uuidv4()} className="flex items-center">
            <FaAngleRight className="h-6 w-6 text-white" />
            <a
              href="#"
              className="ml-1 text-sm font-bold uppercase text-white hover:text-red-600 md:ml-2 dark:text-white dark:hover:text-white"
            >
              {item}
            </a>
          </div>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
