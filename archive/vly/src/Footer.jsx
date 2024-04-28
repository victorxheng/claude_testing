
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] px-7 pb-8 pt-9 sm:px-12 sm:pb-14 sm:pt-16"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 27.8% 0.4%, 17.6% 4.1%, 27.8% 9.8%, 76.1% 76.1%, 81.8% 76.8%, 90.9% 76.4%)',
          }}
        />
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] px-7 pb-8 pt-9 sm:px-12 sm:pb-14 sm:pt-16"
          style={{
            clipPath:
              'polygon(90.7% 38.7%, 54.5% 0%, 23.3% 4.1%, 43.8% 4.1%, 23.3% 24.6%, 0.7% 0.7%, 0% 27.7%, 5.4% 76.1%, 27.1% 76.8%, 76.1% 76.1%, 97.8% 43.8%, 100% 72.5%)',
          }}
        />
      </div>

      {/* Footer Content */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        {/* Footer Sections */}
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Section 1 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Company
            </h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Resources
            </h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Tutorials
                </a>
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Support
            </h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Status
                </a>
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Legal
            </h3>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-700 hover:text-gray-900"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-500">
            &copy; 2023 vly.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
