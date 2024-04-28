
import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Top Gradient */}
      
      


      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <div className="hidden sm:flex items-center justify-center rounded-md bg-gray-50 px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our next generation of products!
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Revolutionize Your SaaS Development
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Unleash the power of natural language with vly.ai - the no-code platform that generates SaaS apps with ease.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default HeroSection;
