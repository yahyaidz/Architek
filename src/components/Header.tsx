import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleMenuClick = (href: string) => {
    setIsMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-top ${
      isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-black/80 backdrop-blur-sm'
    } border-b border-pink-500/20`}>
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              WEB RUNNER
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#home" className="text-white hover:text-pink-400 transition-colors text-sm lg:text-base">
              {t.home}
            </a>
            <a href="#services" className="text-white hover:text-pink-400 transition-colors text-sm lg:text-base">
              {t.services}
            </a>
            <a href="#about" className="text-white hover:text-pink-400 transition-colors text-sm lg:text-base">
              {t.about}
            </a>
            <a href="#contact" className="text-white hover:text-pink-400 transition-colors text-sm lg:text-base">
              {t.contact}
            </a>
          </nav>
          
          {/* Desktop Contact */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 text-white text-sm">
              <Phone size={16} />
              < span >{t.phone}</span>
            </div>
            <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 text-sm touch-button">
              {t.getQuote}
            </button>
          </div>
          
          {/* Mobile CTA Button */}
          <div className="hidden md:flex lg:hidden">
            <button className="px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium text-sm touch-button">
              {t.getQuote}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-pink-400 transition-colors p-2 touch-button"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-pink-500/20 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col gap-4 mt-4">
              <button 
                onClick={() => handleMenuClick('#home')} 
                className="text-white hover:text-pink-400 transition-colors text-left py-2 touch-button"
              >
                {t.home}
              </button>
              <button 
                onClick={() => handleMenuClick('#services')} 
                className="text-white hover:text-pink-400 transition-colors text-left py-2 touch-button"
              >
                {t.services}
              </button>
              <button 
                onClick={() => handleMenuClick('#about')} 
                className="text-white hover:text-pink-400 transition-colors text-left py-2 touch-button"
              >
                {t.about}
              </button>
              <button 
                onClick={() => handleMenuClick('#contact')} 
                className="text-white hover:text-pink-400 transition-colors text-left py-2 touch-button"
              >
                {t.contact}
              </button>
              
              <div className="flex items-center gap-2 text-white text-sm mt-4 py-2">
                <Phone size={16} />
                <a href={`tel:${t.phone.replace(/\s/g, '')}`} className="hover:text-pink-400 transition-colors">
                  {t.phone}
                </a>
              </div>
              
              <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium w-full mt-2 touch-button">
                {t.getQuote}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
