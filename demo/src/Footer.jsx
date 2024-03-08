
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-white">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 top-0 -mt-32 transform-gpu overflow-hidden blur-3xl sm:-mt-64"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] -rotate-[30deg] w-[36.125rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 -mb-32 transform-gpu overflow-hidden blur-3xl sm:-mb-64"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] -rotate-[30deg] w-[36.125rem] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(68.8% 64.4%, 66.1% 15.8%, 53.8% 49.8%, 25.6% 83.9%, 0.1% 16.9%, 22.8% 2.5%, 87.2% 17.4%, 80.4% 42.5%, 92.5% 59.1%, 100% 25.4%, 75.7% 74.7%, 68.8% 64.4%)',
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        {/* Footer Content */}
        <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-3">
          {/* Company Information */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">Company</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">Resources</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                  Webinars
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">Legal</h3>
            <ul role="list" className="mt-6 space-y-4">
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500">
            &copy; 2023 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
