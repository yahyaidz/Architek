// src/hooks/useLanguage.ts
import { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { languageMap, defaultLanguage, Translation } from '../data/translations';

interface LanguageContextType {
  t: Translation;
  currentLanguage: string;
  isRTL: boolean;
  setLanguage: (langCode: string) => void;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Custom hook to provide language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Provider component
interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize language from localStorage or default to English
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    const savedLang = localStorage.getItem('userLanguage');
    // Check if savedLang exists and is a valid key in languageMap
    return savedLang && languageMap[savedLang as keyof typeof languageMap] ? savedLang : defaultLanguage.code;
  });

  // Update document direction based on language
  useEffect(() => {
    const langData = languageMap[currentLanguage as keyof typeof languageMap] || defaultLanguage;
    document.documentElement.dir = langData.direction; // Set dir attribute on html tag
    document.documentElement.lang = langData.code; // Set lang attribute on html tag
    // Optionally, add a class to body for specific RTL styles if needed
    // document.body.classList.toggle('rtl', langData.direction === 'rtl');
  }, [currentLanguage]);

  const setLanguage = useCallback((langCode: string) => {
    if (languageMap[langCode as keyof typeof languageMap]) {
      setCurrentLanguage(langCode);
      localStorage.setItem('userLanguage', langCode); // Persist language choice
    }
  }, []);

  const languageData = languageMap[currentLanguage as keyof typeof languageMap] || defaultLanguage;
  const isRTL = languageData.direction === 'rtl';

  return (
    <LanguageContext.Provider value={{
      t: languageData.translations,
      currentLanguage: currentLanguage,
      isRTL: isRTL,
      setLanguage: setLanguage
    }}>
      {children}
    </LanguageContext.Provider>
  );
};