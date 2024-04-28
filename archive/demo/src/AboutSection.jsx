
import React from 'react';

const AboutSection = () => {
  return (
    <div className="relative bg-white">
      {/* Top Gradient Background */}
      <div
        className="absolute inset-x-0 top-0 transform-gpu -translate-x-1/2 rotate-[30deg] opacity-30"
        style={{
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#ff80b5] to-[#9089fc]"
          aria-hidden="true"
        />
      </div>

      {/* Bottom Gradient Background */}
      <div
        className="absolute inset-x-0 bottom-0 transform-gpu -translate-x-1/2 rotate-[30deg] opacity-30"
        style={{
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#ff80b5] to-[#9089fc]"
          aria-hidden="true"
        />
      </div>

      {/* About Section Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:py-56">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            About Layla Airola
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Layla Airola is a skilled web developer with a passion for creating beautiful and functional websites.
            With years of experience in the industry, she has honed her expertise in HTML, CSS, JavaScript, and
            various front-end frameworks. Layla takes pride in delivering high-quality work that exceeds client
            expectations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
