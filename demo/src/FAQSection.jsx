
import React from 'react';

const FAQSection = () => {
  return (
    <div className="relative bg-white">
      {/* Top Gradient Background */}
      <div
        className="absolute inset-x-0 top-0 transform-gpu -translate-x-1/2 rotate-[30deg] opacity-30"
        style={{
          clipPath: 'polygon(50% 0%, 100% 0, 100% 100%, 0% 100%)',
          background: 'linear-gradient(to right, #ff80b5, #9089fc)',
        }}
      />

      {/* Bottom Gradient Background */}
      <div
        className="absolute inset-x-0 bottom-0 transform-gpu -translate-x-1/2 rotate-[30deg] opacity-30"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 50% 100%, 0% 100%)',
          background: 'linear-gradient(to right, #ff80b5, #9089fc)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-12">
          <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:gap-x-8">
            <div>
              <dt className="text-lg font-medium text-gray-900">
                What is the Startup Showcase?
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                The Startup Showcase is an annual event that brings together entrepreneurs, investors, and industry experts to celebrate and promote innovation in the startup ecosystem.
              </dd>
            </div>

            <div>
              <dt className="text-lg font-medium text-gray-900">
                When and where will the event take place?
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                The Startup Showcase will be held on March 15-17, 2024, at the Silicon Valley Convention Center in San Jose, California.
              </dd>
            </div>

            <div>
              <dt className="text-lg font-medium text-gray-900">
                Who can attend the event?
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                The event is open to anyone interested in the startup and entrepreneurship world, including investors, founders, developers, and tech enthusiasts.
              </dd>
            </div>

            <div>
              <dt className="text-lg font-medium text-gray-900">
                What type of content can I expect at the event?
              </dt>
              <dd className="mt-2 text-base text-gray-500">
                The event will feature keynote speeches from renowned industry leaders, panel discussions on various startup-related topics, networking opportunities, and a showcase of the most promising startups.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
