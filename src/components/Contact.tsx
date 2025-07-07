import React from 'react';
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ContactProps {
  onGetQuote: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onGetQuote }) => {
  const { t } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-16 md:py-20 relative overflow-hidden">
      {/* Smooth transition from about section - matching hero style */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 via-gray-900/80 to-transparent pointer-events-none z-10"></div>
      
      {/* Background with smooth blending */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')] bg-cover bg-center opacity-5 hidden md:block"></div>
        
        {/* Gradient overlays for seamless transitions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-gray-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-transparent to-black/70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div
          ref={elementRef}
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Contact grid - optimized for mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Lyon Office */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-pink-500/50 transition-all">
              <h3 className="text-pink-400 font-bold mb-4 text-base md:text-lg">{t.lyonOffice}</h3>
              <div className="text-xl md:text-2xl font-bold text-white mb-4">ARCHITEK</div>
              <div className="text-gray-300 mb-2 text-sm md:text-base">57 Place de la République</div>
              <div className="text-gray-300 mb-4 text-sm md:text-base">69002 LYON</div>
              <div className="flex items-center gap-2 text-white text-sm">
                <Phone size={16} />
                <span>04 72 54 71 01</span>
              </div>
            </div>

            {/* Paris Office */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-cyan-500/50 transition-all">
              <h3 className="text-cyan-400 font-bold mb-4 text-base md:text-lg">{t.parisOffice}</h3>
              <div className="text-xl md:text-2xl font-bold text-white mb-4">ARCHITEK</div>
              <div className="text-gray-300 mb-2 text-sm md:text-base">58 Rue de Monceau</div>
              <div className="text-gray-300 mb-4 text-sm md:text-base">75008 PARIS</div>
              <div className="flex items-center gap-2 text-white text-sm">
                <Phone size={16} />
                <span>01 88 90 75 08</span>
              </div>
            </div>

            {/* Our Solutions */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-purple-500/50 transition-all">
              <h3 className="text-purple-400 font-bold mb-4 text-base md:text-lg">{t.ourSolutions}</h3>
              <div className="space-y-2 text-gray-300 text-sm">
                <div>{t.websiteCreation}</div>
                <div>{t.appDevelopment}</div>
                <div>{t.saasDevelopment}</div>
                <div>{t.aiIntegration}</div>
                <div>{t.aiConsulting}</div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-pink-500/50 transition-all">
              <h3 className="text-pink-400 font-bold mb-4 text-base md:text-lg">{t.followUs}</h3>
              <div className="flex gap-4 mb-4 justify-center sm:justify-start">
                <Instagram className="text-pink-400 hover:text-pink-300 cursor-pointer transition-colors touch-manipulation" size={24} />
                <Linkedin className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors touch-manipulation" size={24} />
                <Facebook className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors touch-manipulation" size={24} />
                <Youtube className="text-red-400 hover:text-red-300 cursor-pointer transition-colors touch-manipulation" size={24} />
              </div>
              <div className="text-gray-300 text-sm mb-4 text-center sm:text-left">{t.dontMiss}</div>
              <button 
                onClick={onGetQuote}
                className="px-4 py-2 md:px-6 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-600 hover:from-emerald-600 hover:via-cyan-600 hover:to-purple-700 text-white rounded-lg font-medium w-full transition-all text-sm touch-manipulation mb-3"
              >
                {t.getQuote}
              </button>
              <div className="text-center">
                <p className="text-emerald-400 text-xs font-medium">
                  ✓ {t.satisfactionGuarantee}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth transition to footer - matching hero style */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10"></div>
    </section>
  );
};