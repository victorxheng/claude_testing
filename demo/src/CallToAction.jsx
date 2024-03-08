
import React from 'react';

const CallToAction = () => {
  return (
    <div className="relative bg-white">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[calc(50%-11rem)] aspect-[1141/633] w-[72.1875rem] rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.5%, 63.1% 29.5%)',
          }}
        />
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[calc(50%-11rem)] aspect-[1141/633] w-[72.1875rem] rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(26.8% 34.1%, 17.9% 0%, 8.1% 17.7%, 0% 53.9%, 5.4% 94.2%, 24.5% 87.2%, 76.2% 94.2%, 93.8% 53.9%, 100% 0%, 81.8% 34.1%, 49.1% 57.8%, 26.8% 34.1%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Start your free trial today and experience the power of our platform.
          </p>
          <div className="mt-8 flex justify-center gap-x-6">
            <a
              href="#"
              className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a
              href="#"
              className="inline-flex items-center rounded-md border border-transparent bg-gray-100 px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
