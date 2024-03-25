"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between bg-white px-6 py-4 shadow-sm sm:px-8 lg:px-12"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="flex -m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt=""
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link href="/" className="text-sm font-semibold leading-6 text-gray-900">
            Home
          </Link>
          <Link href="/search" className="text-sm font-semibold leading-6 text-gray-900">
            Search
          </Link>
          {isSignedIn ? (
            <Link href={`/profile/${user.username}`} className="text-sm font-semibold leading-6 text-gray-900">
              Profile
            </Link>
          ) : (
            <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
              Log in
            </Link>
          )}
        </div>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-white px-6 py-6 shadow-sm sm:px-8">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex -m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="/logo.svg"
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={toggleMenu}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  <Link
                    href="/"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                </div>
                <div className="py-6">
                  <Link
                    href="/search"
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={toggleMenu}
                  >
                    Search
                  </Link>
                </div>
                {isSignedIn ? (
                  <div className="py-6">
                    <Link
                      href={`/profile/${user.username}`}
                      className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={toggleMenu}
                    >
                      Profile
                    </Link>
                  </div>
                ) : (
                  <div className="py-6">
                    <Link
                      href="/login"
                      className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={toggleMenu}
                    >
                      Log in
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}