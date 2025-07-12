// src/hooks/useLanguage.tsx
import { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { translations } from '../data/translations';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  t: typeof translations.en;
  currentLanguage: Language;
  isRTL: boolean;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC< LanguageProviderProps > = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState< Language >(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved && (saved === 'en' || saved === 'ar') ? saved : 'en';
  });

  const changeLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, []);

  useEffect(() => {
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const value = {
    t: translations[currentLanguage],
    currentLanguage,
    changeLanguage,
    isRTL: currentLanguage === 'ar'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
