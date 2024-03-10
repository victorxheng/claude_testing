
import React from 'react';

const SpeakersSection = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div
        className="absolute inset-0 transform-gpu -translate-x-1/2 rotate-[30deg] opacity-30 bg-gradient-to-r from-[#ff80b5] to-[#9089fc] blur-3xl"
        style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
      />
      <div
        className="absolute inset-0 transform-gpu translate-x-1/2 rotate-[30deg] opacity-30 bg-gradient-to-r from-[#ff80b5] to-[#9089fc] blur-3xl"
        style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
      />
      <div className="relative max-w-2xl mx-auto py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900">Featured Speakers</h2>
          <p className="mt-6 text-lg text-gray-600">
            Learn from industry leaders and experts at the Startup Showcase.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-10 mt-10">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-xl font-bold text-gray-900">Jane Smith</h3>
              <p className="text-gray-600">CEO, Acme Inc.</p>
              <p className="mt-2 text-gray-600">
                Jane is a seasoned entrepreneur with over 15 years of experience in the tech industry. She co-founded Acme Inc. in 2010 and has grown it into a leading provider of innovative software solutions.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-8">
              <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
              <p className="text-gray-600">Venture Capitalist, XYZ Ventures</p>
              <p className="mt-2 text-gray-600">
                John has over a decade of experience in venture capital, investing in promising startups across various sectors. He has a keen eye for identifying disruptive technologies and business models.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakersSection;
