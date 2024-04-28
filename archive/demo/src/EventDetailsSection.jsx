
import React from 'react';

const EventDetailsSection = () => {
  return (
    <div className="relative bg-white">
      {/* Top Gradient Background */}
      <div
        className="absolute inset-x-0 top-0 -translate-x-1/2 transform-gpu overflow-hidden opacity-30"
        style={{
          clipPath:
            'polygon(50% 0%, 100% 0, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 0 0)',
        }}
      >
        <div
          className="absolute inset-x-0 top-0 flex transform-gpu bg-gradient-to-br from-[#ff80b5] to-[#9089fc] opacity-30 blur-3xl"
          style={{
            transform: 'rotate(30deg) translateY(-20%)',
          }}
        />
      </div>

      {/* Bottom Gradient Background */}
      <div
        className="absolute inset-x-0 bottom-0 -translate-x-1/2 transform-gpu overflow-hidden opacity-30"
        style={{
          clipPath:
            'polygon(30% 15%, 70% 0%, 100% 30%, 100% 85%, 70% 100%, 30% 100%, 0 85%, 0 30%)',
        }}
      >
        <div
          className="absolute inset-x-0 bottom-0 flex transform-gpu bg-gradient-to-br from-[#ff80b5] to-[#9089fc] opacity-30 blur-3xl"
          style={{
            transform: 'rotate(30deg) translateY(50%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Startup Showcase 2024
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Join us for the biggest startup event of the year, where the brightest minds in innovation will gather to showcase their groundbreaking ideas and disruptive technologies.
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
              className="rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Learn More <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsSection;
