import { FC, ReactElement } from 'react';
import browseImage from '@/assets/browse.png';
import collaborate from '@/assets/collaborate.png';
import contact from '@/assets/contact.png';
import create from '@/assets/create.png';

const HowItWorks: FC = (): ReactElement => {
  return (
    <section className="container mx-auto items-center bg-white">
      <div className="px-4 py-8 sm:py-16 lg:px-6">
        <div className="mb-8 lg:mb-16">
          <h2 className="mb-4 text-center text-xl font-normal tracking-tight text-orange-400 lg:text-2xl">
            How <strong className="font-extrabold">Barca</strong> works?
          </h2>
          <p className="text-center text-gray-500 sm:text-xl dark:text-gray-400">
            Find quality scholars, experts and freelancers for your next academic or business project.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-4">
          <div className="text-center">
            <div className="bg-primary-100 dark:bg-primary-900 mx-auto my-0 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <img src={create} className="text-primary-600 dark:text-primary-300 h-15 w-15 dark:text-orange-400" alt="" />
            </div>
            <h3 className="mb-2 text-base font-bold lg:text-xl dark:text-orange-400">Create an account</h3>
            <p className="text-gray-500 lg:text-base dark:text-gray-400">Create an account on Barca</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 dark:bg-primary-900 mx-auto my-0 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <img src={browseImage} className="text-primary-600 dark:text-primary-300 h-15 w-15" alt="" />
            </div>
            <h3 className="mb-2 text-base font-bold lg:text-xl dark:text-orange-400">Browse Experts</h3>
            <p className="text-gray-500 dark:text-gray-400">Browse and select the best expert for your work.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 dark:bg-primary-900 mx-auto my-0 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <img src={contact} className="text-primary-600 dark:text-primary-300 h-15 w-15" alt="" />
            </div>
            <h3 className="mb-2 text-base font-bold lg:text-xl dark:text-orange-400">Contact Experts</h3>
            <p className="text-gray-500 dark:text-gray-400">You can send direct messages to experts.</p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 dark:bg-primary-900 mx-auto my-0 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <img src={collaborate} className="text-primary-600 dark:text-primary-300 h-15 w-15" alt="" />
            </div>
            <h3 className="mb-2 text-base font-bold lg:text-xl dark:text-orange-400">Collaborate</h3>
            <p className="text-gray-500 dark:text-gray-400">Collaborate with suitable expert for your projects.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
