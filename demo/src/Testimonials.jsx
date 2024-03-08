
import React from 'react';

const Testimonials = () => {
  return (
    <div className="bg-white">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[calc(50%-11rem)] aspect-[1155/678] w-[72.1875rem] rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="ml-[calc(50%-11rem)] aspect-[1155/678] w-[72.1875rem] rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            What Our Customers Say
          </h2>
          <div className="mt-6 space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="lg:col-span-1">
                <div className="relative rounded-2xl bg-white px-6 py-10 shadow-xl sm:px-8 sm:py-16">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex flex-col items-center">
                    <svg
                      className="h-10 w-10 flex-shrink-0 text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                    </svg>
                    <blockquote className="mt-6 text-center text-xl font-medium text-gray-900">
                      <p>{testimonial.quote}</p>
                    </blockquote>
                    <footer className="mt-6">
                      <p className="text-base font-medium text-gray-600">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </footer>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const testimonials = [
  {
    quote:
      'This product has been a game-changer for our business. It has streamlined our processes and increased our productivity tenfold.',
    name: 'Emily Watson',
    role: 'CEO, Acme Inc.',
  },
  {
    quote:
      'The customer support team is top-notch. They are always available to answer my questions and provide helpful solutions.',
    name: 'John Doe',
    role: 'Marketing Manager, XYZ Corp.',
  },
  {
    quote:
      'I was hesitant to switch to this product at first, but I\'m so glad I did. It has exceeded my expectations in every way.',
    name: 'Jane Smith',
    role: 'Product Manager, TechCo.',
  },
];

export default Testimonials;
