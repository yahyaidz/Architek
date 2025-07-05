import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="py-8 bg-black border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">{t.clientWork}</a>
            <a href="#" className="hover:text-white transition-colors">{t.digitalTips}</a>
            <a href="#" className="hover:text-white transition-colors">{t.contact}</a>
            <a href="#" className="hover:text-white transition-colors">{t.legalMentions}</a>
            <a href="#" className="hover:text-white transition-colors">{t.privacy}</a>
          </div>
          
          <div className="text-gray-400 text-sm">
            {t.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};