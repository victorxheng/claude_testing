import React, { useState } from 'react';

const Hero = () => {
return (<>
<header className="absolute inset-x-0 top-0 z-50">
  <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div className="flex lg:flex-1">
      <a href="#" className="-m-1.5 p-1.5">
        <span className="sr-only">AffordAid</span>
        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
      </a>
    </div>
    <div className="flex lg:hidden">
      <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
        <span className="sr-only">Open main menu</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
    <div className="hidden lg:flex lg:gap-x-12">
      <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Product</a>
      <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Features</a>
      <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Marketplace</a>
      <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Company</a>
    </div>
    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></a>
    </div>
  </nav>
  <div className="lg:hidden" role="dialog" aria-modal="true">
    <div className="fixed inset-0 z-50"></div>
    <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
      <div className="flex items-center justify-between">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">AffordAid</span>
          <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
        </a>
        <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700">
          <span className="sr-only">Close menu</span>
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mt-6 flow-root">
        <div className="-my-6 divide-y divide-gray-500/10">
          <div className="space-y-2 py-6">
            <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Product</a>
            <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Features</a>
            <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Marketplace</a>
            <a href="#" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Company</a>
          </div>
          <div className="py-6">
            <a href="#" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log in</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

<div className="relative isolate pt-14">
  <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr opacity-30 from-[#ff80b5] to-[#9089fc] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
    />
  </div>
  <div className="py-24 sm:py-32 lg:py-40">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full py-1 px-3 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing affordable medical equipment.
            <a href="#" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">AffordAid: Affordable Medical Equipment</h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          AffordAid is dedicated to providing affordable and high-quality medical equipment to individuals and healthcare facilities. Our mission is to make healthcare more accessible and cost-effective.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
    />
  </div>
</div>

// Testimonials
<section className="bg-white py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:text-center">
      <h2 className="text-base font-semibold leading-7 text-indigo-600">Testimonials</h2>
      <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        What our customers have to say
      </p>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        Hear from our satisfied customers about their experiences with AffordAid's affordable and high-quality medical equipment.
      </p>
    </div>
    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
      <div className="flex flex-col gap-y-10">
        <blockquote className="rounded-3xl bg-gray-50 p-6 shadow">
          <div className="flex">
            <img className="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <div className="ml-4">
              <div className="text-base font-semibold leading-7 text-gray-900">Sarah Williams</div>
              <div className="mt-1 text-sm leading-6 text-gray-600">
                <p>Patient</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-base text-gray-500">
            "AffordAid has been a lifesaver for me. Their affordable medical equipment has allowed me to manage my condition without breaking the bank. The quality is excellent, and their customer service is top-notch."
          </p>
        </blockquote>
      </div>

      <div className="flex flex-col gap-y-10">
        <blockquote className="rounded-3xl bg-gray-50 p-6 shadow">
          <div className="flex">
            <img className="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <div className="ml-4">
              <div className="text-base font-semibold leading-7 text-gray-900">Michael Johnson</div>
              <div className="mt-1 text-sm leading-6 text-gray-600">
                <p>Healthcare Provider</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-base text-gray-500">
            "As a healthcare provider, I am constantly looking for ways to reduce costs without compromising quality. AffordAid has been an excellent partner in providing high-quality medical equipment at affordable prices."
          </p>
        </blockquote>
      </div>

      <div className="flex flex-col gap-y-10">
        <blockquote className="rounded-3xl bg-gray-50 p-6 shadow">
          <div className="flex">
            <img className="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <div className="ml-4">
              <div className="text-base font-semibold leading-7 text-gray-900">Emily Davis</div>
              <div className="mt-1 text-sm leading-6 text-gray-600">
                <p>Caregiver</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-base text-gray-500">
            "As a caregiver, I appreciate the ease of use and affordability of AffordAid's medical equipment. It has made my job much easier and allowed me to provide better care for my clients."
          </p>
        </blockquote>
      </div>
    </div>
  </div>
</section>
</>);}
      
export default Hero;
      