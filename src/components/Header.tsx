import React, { useState, useCallback } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-pink-500/20">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo - optimized for mobile */}
          <div className="flex items-center gap-2">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
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
              <span>{t.phone}</span>
            </div>
            <button className="px-4 py-2 xl:px-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 text-sm touch-manipulation">
              {t.getQuote}
            </button>
          </div>
          
          {/* Mobile CTA + Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button className="px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium text-xs touch-manipulation">
              {t.getQuote}
            </button>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-pink-400 transition-colors touch-manipulation"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Tablet CTA */}
          <div className="hidden md:flex lg:hidden">
            <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium text-sm touch-manipulation">
              {t.getQuote}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu - optimized */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-pink-500/20 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-4 mt-4">
              <a 
                href="#home" 
                className="text-white hover:text-pink-400 transition-colors py-2 touch-manipulation"
                onClick={closeMenu}
              >
                {t.home}
              </a>
              <a 
                href="#services" 
                className="text-white hover:text-pink-400 transition-colors py-2 touch-manipulation"
                onClick={closeMenu}
              >
                {t.services}
              </a>
              <a 
                href="#about" 
                className="text-white hover:text-pink-400 transition-colors py-2 touch-manipulation"
                onClick={closeMenu}
              >
                {t.about}
              </a>
              <a 
                href="#contact" 
                className="text-white hover:text-pink-400 transition-colors py-2 touch-manipulation"
                onClick={closeMenu}
              >
                {t.contact}
              </a>
              <div className="flex items-center gap-2 text-white text-sm mt-2 py-2">
                <Phone size={16} />
                <span>{t.phone}</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};