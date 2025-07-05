import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const About: React.FC = () => {
  const { t } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();
  
  return (
    <section id="about" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')] bg-cover bg-center opacity-5 md:opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={elementRef}
          className={`max-w-4xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 md:mb-8 px-4">
            {t.aboutTitle}
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 md:mb-12 px-4">
            {t.aboutDescription}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-pink-500/50 transition-all">
              <div className="text-2xl md:text-3xl font-bold text-pink-400 mb-2">150+</div>
              <div className="text-gray-300 text-sm md:text-base">Active Clients</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-cyan-500/50 transition-all">
              <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">5+</div>
              <div className="text-gray-300 text-sm md:text-base">Years Experience</div>
            </div>
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-purple-500/50 transition-all">
              <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-300 text-sm md:text-base">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
