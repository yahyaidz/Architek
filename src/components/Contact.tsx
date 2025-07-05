import React from 'react';
import { Phone, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();
  
  return (
    <section id="contact" className="py-16 md:py-20 relative overflow-hidden safe-area-bottom">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')] bg-cover bg-center opacity-3 md:opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={elementRef}
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Lyon Office */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-pink-500/50 transition-all">
              <h3 className="text-pink-400 font-bold mb-4 text-base md:text-lg">{t.lyonOffice}</h3>
              <div className="text-xl md:text-2xl font-bold text-white mb-4">WEB RUNNER</div>
              <div className="text-gray-300 mb-2 text-sm md:text-base">57 Place de la République</div>
              <div className="text-gray-300 mb-4 text-sm md:text-base">69002 LYON</div>
              <a href="tel:0472547101" className="flex items-center gap-2 text-white hover:text-pink-400 transition-colors touch-button">
                <Phone size={16} />
                <span className="text-sm md:text-base">04 72 54 71 01</span>
              </a>
            </div>
            
            {/* Paris Office */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-cyan-500/50 transition-all">
              <h3 className="text-cyan-400 font-bold mb-4 text-base md:text-lg">{t.parisOffice}</h3>
              <div className="text-xl md:text-2xl font-bold text-white mb-4">WEB RUNNER</div>
              <div className="text-gray-300 mb-2 text-sm md:text-base">58 Rue de Monceau</div>
              <div className="text-gray-300 mb-4 text-sm md:text-base">75008 PARIS</div>
              <a href="tel:0188907508" className="flex items-center gap-2 text-white hover:text-pink-400 transition-colors touch-button">
                <Phone size={16} />
                <span className="text-sm md:text-base">01 88 90 75 08</span>
              </a>
            </div>
            
            {/* Our Solutions */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-purple-500/50 transition-all">
              <h3 className="text-purple-400 font-bold mb-4 text-base md:text-lg">{t.ourSolutions}</h3>
              <div className="space-y-2 text-gray-300 text-sm md:text-base">
                < div >{t.webDesign}</div>
                < div >{t.googleSeo}</div>
                < div >{t.communityMgmt}</div>
                <div className="hidden md:block">{t.virtualTour}</div>
                <div className="hidden md:block">{t.virtualReality}</div>
              </div>
            </div>
            
            {/* Follow Us */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-pink-500/50 transition-all">
              <h3 className="text-pink-400 font-bold mb-4 text-base md:text-lg">{t.followUs}</h3>
              <div className="flex gap-3 md:gap-4 mb-4 justify-center md:justify-start">
                <Instagram className="text-pink-400 hover:text-pink-300 cursor-pointer transition-colors touch-button" size={20} />
                <Linkedin className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors touch-button" size={20} />
                <Facebook className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors touch-button" size={20} />
                <Youtube className="text-red-400 hover:text-red-300 cursor-pointer transition-colors touch-button" size={20} />
              </div>
              <div className="text-gray-300 text-xs md:text-sm mb-4 text-center md:text-left">{t.dontMiss}</div>
              <button className="px-4 md:px-6 py-2 md:py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-medium w-full transition-all text-sm md:text-base touch-button">
                {t.getQuote}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
