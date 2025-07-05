import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-pink-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              WEB RUNNER
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-white hover:text-pink-400 transition-colors">
              {t.home}
            </a>
            <a href="#services" className="text-white hover:text-pink-400 transition-colors">
              {t.services}
            </a>
            <a href="#about" className="text-white hover:text-pink-400 transition-colors">
              {t.about}
            </a>
            <a href="#contact" className="text-white hover:text-pink-400 transition-colors">
              {t.contact}
            </a>
          </nav>
          
          {/* Contact */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-white text-sm">
              <Phone size={16} />
              <span>{t.phone}</span>
            </div>
            <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105">
              {t.getQuote}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-pink-400 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-pink-500/20">
            <nav className="flex flex-col gap-4 mt-4">
              <a href="#home" className="text-white hover:text-pink-400 transition-colors">
                {t.home}
              </a>
              <a href="#services" className="text-white hover:text-pink-400 transition-colors">
                {t.services}
              </a>
              <a href="#about" className="text-white hover:text-pink-400 transition-colors">
                {t.about}
              </a>
              <a href="#contact" className="text-white hover:text-pink-400 transition-colors">
                {t.contact}
              </a>
              <div className="flex items-center gap-2 text-white text-sm mt-4">
                <Phone size={16} />
                <span>{t.phone}</span>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-medium w-fit">
                {t.getQuote}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};