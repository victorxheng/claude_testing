
import React from 'react';

const TicketSection = () => {
  return (
    <div className="relative bg-white">
      <div
        className="absolute inset-0 transform-gpu -translate-x-1/2 rotate-[30deg] opacity-30 bg-gradient-to-r from-[#ff80b5] to-[#9089fc]"
        style={{
          clipPath:
            'polygon(30% 0%, 100% 0, 100% 35%, 100% 70%, 70% 95%, 53% 78%, 48% 85%, 28% 85%, 0% 70%, 0% 35%, 0% 0)',
        }}
      />
      <div
        className="absolute inset-0 transform-gpu translate-x-1/2 -rotate-[30deg] opacity-30 bg-gradient-to-r from-[#ff80b5] to-[#9089fc]"
        style={{
          clipPath:
            'polygon(63% 0%, 90% 0%, 90% 18%, 100% 35%, 100% 65%, 90% 82%, 90% 100%, 63% 100%, 45% 95%, 40% 85%, 0 85%, 0 50%, 0 15%)',
        }}
      />
      <div className="relative mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:flex justify-center rounded-md ring-1 ring-gray-900/10">
          <span className="px-3 py-2 text-sm font-semibold text-gray-600">
            Announcing the Startup Showcase 2024
          </span>
        </div>
        <h2 className="mt-6 text-4xl font-bold tracking-tight text-center sm:text-6xl">
          Startup Showcase 2024
        </h2>
        <p className="mt-6 text-lg text-center text-gray-600">
          Discover the next big thing in tech and innovation.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get Tickets
          </a>
          <a
            href="#"
            className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-900/10 hover:ring-gray-900/20"
          >
            Learn More <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TicketSection;
