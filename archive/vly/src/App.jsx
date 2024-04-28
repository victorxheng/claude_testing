
import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import FaqSection from './FaqSection';
import TryItOutSection from './TryItOutSection';
import Footer from './Footer';

const App = () => {
  return (
    <div>
      <div
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -top-40 -ml-96 h-[50.1875rem] w-full max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:ml-0 lg:left-48 lg:ml-0 lg:-translate-x-1/2"
          style={{
            clipPath:
              'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 27.8% 0%, 17.9% 30.9%, 27.8% 50.7%, 40.2% 59.9%, 75% 50.5%, 55.5% 87.9%, 27.8% 87.5%, 23.8% 97.2%, 0% 87.5%, 0% 0%, 30.3% 9.1%, 50.5% 5.8%, 55.5% 0%, 75% 0%, 87.5% 35.6%, 79.9% 35.6%)',
          }}
        />
      </div>
      <Navbar />
      <HeroSection />
      <FaqSection />
      <TryItOutSection />
      <Footer />
      
      
    </div>
  );
};

export default App;
