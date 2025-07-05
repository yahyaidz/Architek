import { translations } from '../data/translations';

export const useLanguage = () => {
  return { 
    t: translations,
    isRTL: false,
    currentLanguage: 'en'
  };
};