import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="py-6 md:py-8 bg-black border-t border-gray-800 safe-area-bottom">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-gray-400 text-xs md:text-sm">
            <a href="#" className="hover:text-white transition-colors touch-button py-1">{t.clientWork}</a>
            <a href="#" className="hover:text-white transition-colors touch-button py-1">{t.digitalTips}</a>
            <a href="#contact" className="hover:text-white transition-colors touch-button py-1">{t.contact}</a>
            <a href="#" className="hover:text-white transition-colors touch-button py-1">{t.legalMentions}</a>
            <a href="#" className="hover:text-white transition-colors touch-button py-1">{t.privacy}</a>
          </div>
          
          <div className="text-gray-400 text-xs md:text-sm text-center md:text-right">
            {t.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};
