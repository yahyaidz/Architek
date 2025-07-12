import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <footer className={`py-6 md:py-8 bg-black border-t border-gray-800 relative ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Smooth transition from contact section - matching hero style */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black via-black/90 to-transparent pointer-events-none z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Footer links - responsive */}
          <div className={`flex flex-wrap justify-center ${isRTL ? 'md:justify-end' : 'md:justify-start'} gap-4 md:gap-6 text-gray-400 text-xs md:text-sm`}>
            <a href="#" className={`hover:text-white transition-colors touch-manipulation ${isRTL ? 'font-arabic' : ''}`}>{t.clientWork}</a>
            <a href="#" className={`hover:text-white transition-colors touch-manipulation ${isRTL ? 'font-arabic' : ''}`}>{t.digitalTips}</a>
            <a href="#" className={`hover:text-white transition-colors touch-manipulation ${isRTL ? 'font-arabic' : ''}`}>{t.contact}</a>
            <a href="#" className={`hover:text-white transition-colors touch-manipulation ${isRTL ? 'font-arabic' : ''}`}>{t.legalMentions}</a>
            <a href="#" className={`hover:text-white transition-colors touch-manipulation ${isRTL ? 'font-arabic' : ''}`}>{t.privacy}</a>
          </div>
          
          <div className={`text-gray-400 text-xs md:text-sm text-center ${isRTL ? 'md:text-left font-arabic' : 'md:text-right'}`}>
            {t.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};