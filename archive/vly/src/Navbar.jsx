
import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative">
      {/* Top Gradient */}

      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-30rem)] -top-72 h-[63.1875rem] w-full max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] lg:left-[calc(50%-39rem)]"
          style={{
            clipPath:
              'polygon(74.8% 48%, 88.7% 285%, 53.8% 166.4%, 39.9% 144.7%, 20.1% 193.8%, 35% 189.6%, 22.2% 211.1%, 35.2% 168.6%, 30.6% 158.2%, 9.9% 219.8%, 49.5% 245.6%, 12.9% 276.3%, 24.7% 307.9%, 4.8% 242.6%, 60.3% 189.6%, 40.7% 238.2%, 39.2% 184.8%, 91.2% 265.2%, 61.3% 109.6%, 61.3% 109.6%, 70.4% 63.1%, 85% 93.8%, 97% 93.8%, 100% 97.8%, 100% 100%, 0% 100%, 0% 0%, 30.3% 9.1%, 50.5% 5.8%, 55.5% 0%, 75% 0%, 87.5% 35.6%, 79.9% 35.6%)',
          }}
        />
      </div>

      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {/* Add navigation links here */}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        {/* Mobile menu, show/hide based on menu state */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } lg:hidden absolute inset-x-0 top-0 z-50 bg-white px-6 pt-6 pb-4 shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={toggleMenu}
            >
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div className="mt-6 space-y-2">
            {/* Add mobile navigation links here */}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
