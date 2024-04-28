
// Testimonials.jsx

import React from 'react';

const Testimonials = () => {
  return (
    <div className="relative bg-white">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 top-0 opacity-30 transform-gpu -translate-x-1/2 rotate-[30deg]"
        style={{
          clipPath:
            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
        }}
      >
        <div
          className="bg-gradient-to-r from-[#ff80b5] to-[#9089fc] h-[50rem] w-[200%]"
          aria-hidden="true"
        />
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 opacity-30 transform-gpu translate-x-1/2 rotate-[30deg]"
        style={{
          clipPath:
            'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
        }}
      >
        <div
          className="bg-gradient-to-r from-[#ff80b5] to-[#9089fc] h-[50rem] w-[200%]"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-32 sm:pt-24 sm:pb-40 lg:pt-32">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            What Our Customers Say
          </h2>
          <div className="mt-6 space-y-10 border-t border-b border-gray-200 py-10">
            <div className="flex flex-col items-center justify-between gap-x-6 gap-y-4 sm:flex-row">
              <img
                src="https://example.com/avatar.jpg"
                alt="Avatar"
                className="h-16 w-16 rounded-full"
              />
              <blockquote className="sm:text-left">
                <p className="text-gray-600">
                  "AffordAid has been a lifesaver for my family. Their affordable
                  medical equipment has allowed us to manage my mother's condition
                  without breaking the bank. The quality is excellent, and the
                  customer service is top-notch."
                </p>
                <cite className="mt-4 font-semibold text-gray-900">
                  Jane Doe, Happy Customer
                </cite>
              </blockquote>
            </div>
            {/* Add more testimonial items here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
