
import React from 'react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background Gradients */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu opacity-30"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 blur-3xl"
          style={{
            clipPath:
              'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          }}
        />
      </div>
      <div
        className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 transform-gpu opacity-30"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 blur-3xl"
          style={{
            clipPath:
              'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="hidden sm:flex sm:items-center sm:justify-center sm:rounded-md sm:ring-1 sm:ring-gray-900/10 sm:ring-inset">
          <span className="font-semibold text-indigo-600">Announcing new product!</span>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Data to enrich your online business
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
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

export default Hero;
