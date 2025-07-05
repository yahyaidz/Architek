export interface Language {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
}

export interface Translation {
  // Navigation
  menu: string;
  home: string;
  services: string;
  about: string;
  contact: string;
  
  // Header
  phone: string;
  getQuote: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // Services
  webDevelopment: string;
  webDevelopmentDesc: string;
  seoSea: string;
  seoSeaDesc: string;
  communityManagement: string;
  communityManagementDesc: string;
  learnMore: string;
  
  // About
  aboutTitle: string;
  aboutDescription: string;
  clientsCount: string;
  
  // Contact
  contactTitle: string;
  contactDescription: string;
  lyonOffice: string;
  parisOffice: string;
  ourSolutions: string;
  followUs: string;
  dontMiss: string;
  
  // Footer
  webDesign: string;
  googleSeo: string;
  communityMgmt: string;
  virtualTour: string;
  virtualReality: string;
  clientWork: string;
  digitalTips: string;
  legalMentions: string;
  privacy: string;
  copyright: string;
}