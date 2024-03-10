
import React from 'react';

const CallToAction = () => {
  return (
    <div className="bg-green-500 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Start Shopping for Affordable Medical Equipment Today
          </h2>
          <p className="mt-4 text-lg text-green-100">
            Browse our wide selection of gently used medical equipment and save big.
          </p>
          <div className="mt-8">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-800 bg-white hover:bg-green-100"
            >
              Browse Equipment
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
