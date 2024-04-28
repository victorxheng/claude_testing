
import React, { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Portfolio', href: '#', current: true },
  { name: 'About', href: '#', current: false },
  { name: 'Services', href: '#', current: false },
  { name: 'Testimonials', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-y-0 left-1/2 -z-10 w-[200%] -translate-x-1/2 transform-gpu overflow-hidden blur-[118px]">
        <div
          className="absolute inset-0 opacity-30 animate-spin-slow"
          style={{
            background: 'linear-gradient(90deg, #ff80b5, #9089fc)',
            clipPath:
              'polygon(40% 0%, 40% 13%, 50% 28%, 60% 38%, 100% 38%, 100% 100%, 0% 100%, 0% 0%)',
          }}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[35rem] w-full blur-[58px]" style={{ background: 'linear-gradient(90deg, #ff80b5, #9089fc)', opacity: 0.3, clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 100%, 0% 100%, 0% 60%)' }} />
      <div className="absolute inset-x-0 top-0 z-50 mx-auto max-w-7xl px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Layla Airola</span>
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className={classNames(
                item.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                'text-sm font-semibold leading-6'
              )}>
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Disclosure as="nav" className="lg:hidden" onClick={() => setIsOpen(false)}>
          {({ open }) => (
            <>
              <Disclosure.Panel className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition">
                <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="px-5 pt-5 pb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                          alt="Layla Airola"
                        />
                      </div>
                      <div className="-mr-2">
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close menu</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </Disclosure.Button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <nav className="grid gap-y-8">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
                          >
                            <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>
                  <div className="space-y-6 py-6 px-5">
                    <div>
                      <a
                        href="#"
                        className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                      >
                        Log in
                      </a>
                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
