
import React from 'react';

const Features = () => {
  return (
    <div className="relative bg-white">
      {/* Top Gradient Background */}
      <div
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[calc(50%-11rem)] aspect-[1141/1512] w-[72.1875rem] rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(63.1% 29.5%, 88.7% 100%, 27.9% 100%, 0% 0%, 0% 0%, 30.3% 0%)',
          }}
        />
      </div>

      {/* Bottom Gradient Background */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[calc(50%-11rem)] aspect-[1141/1512] w-[72.1875rem] rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(63.1% 70.5%, 88.7% 0%, 27.9% 0%, 0% 100%, 0% 100%, 30.3% 100%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Key Features
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover the powerful features that make our product stand out.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-y-10 mt-10 sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
            <div className="flex flex-col items-center">
              <svg
                className="h-12 w-12 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {/* Feature Icon SVG */}
              </svg>
              <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                Feature 1
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                Describe the first key feature of your product or service.
              </p>
            </div>
            {/* Add more feature items here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
