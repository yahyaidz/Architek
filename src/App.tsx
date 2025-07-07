import React from 'react';
import { QuoteModal } from './components/QuoteModal';
import { useQuoteModal } from './hooks/useQuoteModal';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  const { isOpen, openModal, closeModal } = useQuoteModal();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header onGetQuote={openModal} />
      <Hero onGetQuote={openModal} />
      <Services onGetQuote={openModal} />
      <About />
      <Contact onGetQuote={openModal} />
      <Footer />
      <QuoteModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}

export default App;