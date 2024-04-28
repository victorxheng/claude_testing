
import React from 'react';

const ContactSection = () => {
  return (
    <section className="relative bg-white">
      {/* Top Gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 transform-gpu opacity-30"
        style={{
          clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)',
          transform: 'rotate(30deg)',
        }}
      >
        <div
          className="h-[50vh] w-[200vw] bg-gradient-to-r from-[#ff80b5] to-[#9089fc]"
          aria-hidden="true"
        />
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 transform-gpu opacity-30"
        style={{
          clipPath: 'polygon(0 0, 50% 50%, 100% 0, 50% 100%)',
        }}
      >
        <div
          className="h-[50vh] w-[200vw] bg-gradient-to-r from-[#ff80b5] to-[#9089fc]"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h2 className="font-bold text-4xl sm:text-6xl leading-tighter tracking-tight">
            Get in Touch
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Have a project in mind or want to collaborate? Let's connect!
          </p>
        </div>

        {/* Contact Form */}
        <form className="mt-10 grid grid-cols-1 gap-y-10">
          <div>
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="font-semibold">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              className="mt-2 block w-full rounded-md border border-gray-300 py-3 px-4 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
