
import React from 'react';

const FAQ = () => {
  return (
    <div className="bg-white">
      {/* Top Gradient Background */}
      <div
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-[#ff80b5] to-[#9089fc] w-[300vw] h-[300vw] rounded-full"
          style={{
            clipPath:
              'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)',
          }}
        />
      </div>

      {/* Bottom Gradient Background */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-br from-[#ff80b5] to-[#9089fc] w-[300vw] h-[300vw] rounded-full"
          style={{
            clipPath:
              'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)',
          }}
        />
      </div>

      {/* FAQ Section */}
      <div className="relative mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:py-56">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-500">
            Here are some of the most commonly asked questions about our product. If you don't find what you're looking for, please don't hesitate to reach out to our support team.
          </p>
        </div>
        <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-y-16 sm:gap-y-20 lg:max-w-none lg:grid-cols-2">
          {/* FAQ Item */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-xl font-semibold leading-7 text-gray-900">
              How does your product work?
            </h3>
            <p className="text-gray-600">
              Our product utilizes advanced machine learning algorithms to analyze data and provide accurate insights. It's designed to be user-friendly and can be easily integrated into your existing systems.
            </p>
          </div>

          {/* FAQ Item */}
          <div className="flex flex-col gap-y-4">
            <h3 className="text-xl font-semibold leading-7 text-gray-900">
              What kind of data can your product handle?
            </h3>
            <p className="text-gray-600">
              Our product can handle a wide variety of data formats, including structured data (e.g., databases, spreadsheets) and unstructured data (e.g., text, images, videos).
            </p>
          </div>

          {/* Add more FAQ items here */}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
