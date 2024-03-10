
import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import EventDetailsSection from './EventDetailsSection';
import SpeakersSection from './SpeakersSection';
import SponsorSection from './SponsorSection';
import TicketSection from './TicketSection';
import FAQSection from './FAQSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation />
      <main className="flex-grow">
        <HeroSection />
        <EventDetailsSection />
        <SpeakersSection />
        <SponsorSection />
        <TicketSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
