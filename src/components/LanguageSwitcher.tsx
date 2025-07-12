import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage, type Language } from '../hooks/useLanguage';

export const LanguageSwitcher: React.FC = () => {
  const { t, currentLanguage, changeLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en' as Language, name: t.english, flag: '🇺🇸' },
    { code: 'ar' as Language, name: t.arabic, flag: '🇸🇦' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: Language) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 text-white hover:text-pink-400 transition-colors bg-gray-800/50 rounded-lg border border-gray-700 hover:border-pink-500/50 ${
          isRTL ? 'flex-row-reverse' : ''
        }`}
        aria-label={t.language}
      >
        <Globe size={16} />
        <span className="text-sm font-medium">{currentLang?.flag}</span>
        <ChevronDown 
          size={14} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 min-w-[140px] ${
          isRTL ? 'left-0' : 'right-0'
        }`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                currentLanguage === lang.code ? 'bg-gray-700 text-pink-400' : 'text-white'
              } ${
                lang === languages[0] ? 'rounded-t-lg' : ''
              } ${
                lang === languages[languages.length - 1] ? 'rounded-b-lg' : ''
              } ${
                isRTL ? 'text-right flex-row-reverse' : 'text-left'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};