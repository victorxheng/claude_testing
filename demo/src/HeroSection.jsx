
import React from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[592px] -translate-x-1/2 transform-gpu overflow-hidden blur-3xl sm:top-0 sm:ml-[calc(50%-42rem)] lg:ml-0 lg:left-1/2 lg:translate-x-[-50%] lg:origin-top">
        <div className="absolute inset-0 flex justify-center overflow-hidden">
          <div
            aria-hidden="true"
            className="flex-none bg-gradient-to-r from-[#ff80b5] via-[#9089fc] to-[#ff80b5] opacity-30 blur-3xl"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              transform: 'rotate(30deg)',
            }}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[746px] -translate-x-1/2 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] sm:ml-[calc(50%-42rem)] lg:ml-0 lg:left-1/2 lg:translate-x-[-50%] lg:origin-top">
        <div className="absolute inset-0 flex justify-center">
          <div
            aria-hidden="true"
            className="flex-none bg-gradient-to-r from-[#ff80b5] via-[#9089fc] to-[#ff80b5] opacity-30 blur-3xl"
            style={{
              clipPath:
                'polygon(24.1% 0%, 0.9% 0.7%, 76% 25.1%, 60.9% 16.9%, 94.1% 58.3%, 24.1% 0%)',
            }}
          />
        </div>
      </div>

      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {/* Add navigation links here */}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        {/* Add mobile menu here */}
      </header>

      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our next round of funding.{' '}
            <a href="#" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Layla Airola
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Front-end developer and UI/UX designer with a passion for creating
            beautiful and intuitive digital experiences.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Hire Me
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
            >
              Learn More <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
