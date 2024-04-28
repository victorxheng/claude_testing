
// Navbar.jsx
import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative bg-white">
      {/* Top Gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 transform-gpu opacity-30"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 70vh, 0 100%)',
          background: 'linear-gradient(30deg, #ff80b5, #9089fc)',
        }}
      />

      {/* Bottom Gradient */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 transform-gpu opacity-30"
        style={{
          clipPath: 'polygon(0 30vh, 100% 0, 100% 100%, 0 100%)',
          background: 'linear-gradient(30deg, #ff80b5, #9089fc)',
        }}
      />

      {/* Header */}
      <div className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <img className="h-8 w-auto" src={""} alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in
            </a>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 z-50 bg-white px-6 pt-24 pb-20 sm:block sm:p-0">
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <div className="flex flex-col gap-y-2">
                <a
                  href="#"
                  className="-m-3 flex items-center rounded-lg p-3 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
