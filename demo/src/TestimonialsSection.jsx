
import React from 'react';

const TestimonialsSection = () => {
  return (
    <div className="relative bg-white">
      {/* Top Gradient Background */}
      <div
        className="absolute inset-x-0 top-0 transform-gpu -translate-x-1/2 rotate-[30deg] opacity-30"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5.8vw))'
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#ff80b5] to-[#9089fc]"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Bottom Gradient Background */}
      <div
        className="absolute inset-x-0 bottom-0 transform-gpu -translate-x-1/2 rotate-[30deg] opacity-30"
        style={{
          clipPath: 'polygon(0 5.8vw, 100% 0, 100% 100%, 0 100%)'
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#ff80b5] to-[#9089fc]"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">
            What People Are Saying
          </h2>
          <div className="mt-6 space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
            {/* Testimonials */}
            <blockquote className="rounded-lg bg-white p-6 shadow">
              <p className="text-gray-600">
                "Layla's attention to detail and passion for her work is truly impressive. She delivered a stunning website that exceeded all of our expectations. Highly recommended!"
              </p>
              <footer className="mt-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://example.com/avatar1.jpg"
                      alt="Avatar"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-gray-900">John Doe</div>
                    <div className="text-gray-600">CEO, Company</div>
                  </div>
                </div>
              </footer>
            </blockquote>
            {/* Add more testimonials here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
