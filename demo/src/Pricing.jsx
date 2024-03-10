
import React from 'react';

const Pricing = () => {
  return (
    <div className="bg-white">
      <div
        className="absolute inset-x-0 top-0 z-10 opacity-30 transform-gpu -translate-x-1/2 rotate-[30deg] overflow-hidden"
        style={{
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#ff80b5] to-[#9089fc]"
          style={{ mixBlendMode: 'overlay' }}
        />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 z-10 opacity-30 transform-gpu -translate-x-1/2 rotate-[30deg] overflow-hidden"
        style={{
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 15%, 100% 85%, 70% 100%, 30% 100%, 0% 85%, 0% 15%)',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#ff80b5] to-[#9089fc]"
          style={{ mixBlendMode: 'overlay' }}
        />
      </div>

      <div className="relative px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="max-w-2xl mx-auto text-center lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that's right for your business. Simple, transparent pricing. No hidden fees.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-16 grid grid-cols-1 lg:grid-cols-3 gap-y-10 gap-x-8">
          {/* Add pricing plan components here */}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
