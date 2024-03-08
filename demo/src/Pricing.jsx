
import React from 'react';

const Pricing = () => {
  return (
    <div className="bg-white">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-[#ff80b5] to-[#9089fc] px-7 pb-8 pt-9 sm:px-16 sm:pb-14 sm:pt-16 lg:px-24 lg:pb-20 lg:pt-24"
          style={{
            clipPath:
              'polygon(63% 0, 100% 0, 100% 100%, 70% 100%, 73% 92%, 67% 83%, 62% 88%, 52% 92%, 48% 97%, 25% 88%, 16% 82%, 0 94%, 0% 59%, 0% 0)',
          }}
        />
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] px-7 pb-8 pt-9 sm:px-16 sm:pb-14 sm:pt-16 lg:px-24 lg:pb-20 lg:pt-24"
          style={{
            clipPath:
              'polygon(28% 0, 100% 0, 100% 100%, 70% 100%, 55% 93%, 34% 93%, 30% 85%, 25% 80%, 17% 85%, 0% 80%, 0 63%, 0% 0)',
          }}
        />
      </div>

      {/* Pricing Content */}
      <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 sm:pt-32 sm:pb-40 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that works best for your business.
          </p>
        </div>
        <div className="mt-16 space-y-10 sm:mt-20 lg:mt-24">
          {/* Pricing Cards */}
          {/* Add pricing card components here */}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
