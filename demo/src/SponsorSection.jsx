
import React from 'react';

const SponsorSection = () => {
  return (
    <div className="relative bg-white">
      <div
        className="absolute inset-0 -top-1/2 -translate-x-1/2 transform-gpu rotate-[30deg] opacity-30"
        style={{
          background: 'linear-gradient(to bottom right, #ff80b5, #9089fc)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
        }}
      />
      <div
        className="absolute inset-0 -bottom-1/2 -translate-x-1/2 transform-gpu rotate-[30deg] opacity-30"
        style={{
          background: 'linear-gradient(to top left, #ff80b5, #9089fc)',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Sponsors</h2>
          <p className="mt-4 text-xl text-gray-500">
            We're grateful to our sponsors for their support in making this event possible.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <div className="flex items-center justify-center">
            <img src="/sponsor-logo-1.svg" alt="Sponsor 1" className="h-12" />
          </div>
          <div className="flex items-center justify-center">
            <img src="/sponsor-logo-2.svg" alt="Sponsor 2" className="h-12" />
          </div>
          <div className="flex items-center justify-center">
            <img src="/sponsor-logo-3.svg" alt="Sponsor 3" className="h-12" />
          </div>
          {/* Add more sponsor logos here */}
        </div>
      </div>
    </div>
  );
};

export default SponsorSection;
