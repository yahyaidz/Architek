import { useState, useEffect } from 'react';
import { translations } from '../data/translations';

export type Language = 'en' | 'ar';

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to English
    const saved = localStorage.getItem('language') as Language;
    return saved && (saved === 'en' || saved === 'ar') ? saved : 'en';
  });

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    
    // Update document direction and lang attribute
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    // Set initial direction and lang
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return {
    t: translations[currentLanguage],
    currentLanguage,
    changeLanguage,
    isRTL: currentLanguage === 'ar'
  };
};