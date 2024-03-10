
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative bg-white">
      <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:inset-x-auto sm:left-1/2 sm:-ml-[50vw] sm:w-[100vw]">
        <div className="relative left-1/2 -ml-[50vw] aspect-[1155/678] w-[100vw] max-w-none">
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 transform rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 blur-3xl" style={{ clipPath: 'polygon(74.8% 44.2%, 97.2% 73.8%, 100% 34.2%, 80.8% 5.8%, 48.1% 0.1%, 27% 30.3%, 33.9% 58.7%, 50.1% 81.8%, 88% 84.5%)' }}></div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:inset-x-auto sm:left-1/2 sm:-ml-[50vw] sm:w-[100vw]">
        <div className="relative left-1/2 -ml-[50vw] aspect-[1155/678] w-[100vw] max-w-none">
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 transform rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 blur-3xl" style={{ clipPath: 'polygon(24.1% 44.8%, -8.1% 68.7%, 12.1% 97.7%, 40.4% 87.5%, 83.6% 94.3%, 74.4% 64.3%, 52.3% 40.7%, 43.6% 22.2%, 8.6% 24.1%)' }}></div>
        </div>
      </div>
      <div className="relative z-50 px-6 pt-6 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-7xl lg:mx-auto lg:px-8">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="#">
                <span className="sr-only">Startup Showcase</span>
                <img alt="Startup Showcase Logo" className="h-8 w-auto sm:h-10" src="/logo.svg" />
              </a>
              <div className="-mr-2 flex items-center md:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  aria-expanded="false"
                  onClick={toggleMenu}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:ml-10 md:block md:space-x-8 md:pr-4">
            <a href="#" className="font-medium text-gray-500 hover:text-gray-900">
              About
            </a>
            <a href="#" className="font-medium text-gray-500 hover:text-gray-900">
              Speakers
            </a>
            <a href="#" className="font-medium text-gray-500 hover:text-gray-900">
              Schedule
            </a>
            <a href="#" className="font-medium text-gray-500 hover:text-gray-900">
              Sponsors
            </a>
            <a href="#" className="font-medium text-gray-500 hover:text-gray-900">
              Tickets
            </a>
          </div>
          <div className="hidden md:block">
            <a href="#" className="inline-flex items-center rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-600 shadow-sm hover:bg-gray-50">
              Log in
            </a>
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition md:hidden">
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img className="h-8 w-auto" src="/logo.svg" alt="Startup Showcase Logo" />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={toggleMenu}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <a href="#" className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                    <span className="ml-3 text-base font-medium text-gray-900">About</span>
                  </a>
                  <a href="#" className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                    <span className="ml-3 text-base font-medium text-gray-900">Speakers</span>
                  </a>
                  <a href="#" className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                    <span className="ml-3 text-base font-medium text-gray-900">Schedule</span>
                  </a>
                  <a href="#" className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                    <span className="ml-3 text-base font-medium text-gray-900">Sponsors</span>
                  </a>
                  <a href="#" className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50">
                    <span className="ml-3 text-base font-medium text-gray-900">Tickets</span>
                  </a>
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div>
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navigation;
