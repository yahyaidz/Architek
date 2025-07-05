import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../hooks/useLanguage';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
}

export const ServiceCard: React.FC< ServiceCardProps > = ({
  title,
  description,
  icon,
  gradient,
  delay = 0
}) => {
  const { elementRef, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  
  return (
    <div 
      ref={elementRef}
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-pink-500/50 transition-all duration-300 group hover:transform hover:scale-105 h-full flex flex-col">
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform mx-auto md:mx-0`}>
          {icon}
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 group-hover:text-pink-400 transition-colors text-center md:text-left">
          {title}
        </h3>
        
        <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base text-center md:text-left flex-grow">
          {description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <button className="px-4 md:px-6 py-2 md:py-2 border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white rounded-lg transition-all font-medium text-sm md:text-base touch-button flex-1 sm:flex-none">
            {t.learnMore}
          </button>
          <button className="px-4 md:px-6 py-2 md:py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all font-medium text-sm md:text-base touch-button flex-1 sm:flex-none">
            {t.getQuote}
          </button>
        </div>
      </div>
    </div>
  );
};
