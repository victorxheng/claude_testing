
import React from 'react';
import { FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-white">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        style={{
          clipPath:
            'polygon(50% 0%, 0% 0%, 40% 40%, 60% 60%, 100% 60%, 90% 90%, 60% 90%, 40% 40%, 30% 30%, 50% 30%, 70% 30%, 70% 70%, 30% 70%, 30% 30%)',
        }}
      >
        <div
          className="absolute -top-40 -left-[10%] h-[50rem] w-[100rem] rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc]"
          style={{
            willChange: 'transform',
          }}
        />
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        style={{
          clipPath:
            'polygon(50% 100%, 0% 100%, 20% 80%, 40% 60%, 60% 40%, 80% 20%, 100% 20%, 70% 50%, 50% 70%, 30% 50%, 30% 30%, 50% 30%, 70% 30%)',
        }}
      >
        <div
          className="absolute -bottom-40 -left-[30%] h-[50rem] w-[100rem] rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc]"
          style={{
            willChange: 'transform',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <FaTwitter className="h-6 w-6" aria-hidden="true" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <FaGithub className="h-6 w-6" aria-hidden="true" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500">
            <FaLinkedinIn className="h-6 w-6" aria-hidden="true" />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Layla Airola. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
