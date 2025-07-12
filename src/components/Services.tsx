import React, { useMemo } from 'react';
import { Code, Globe, Palette, Smartphone, Layers, Zap, Brain, Bot } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface ServicesProps {
  onGetQuote: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onGetQuote }) => {
  const { t, isRTL } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();

  // Memoize services data to prevent re-creation
  const services = useMemo(() => [
    {
      title: t.websiteCreation,
      description: t.websiteCreationDesc,
      icon: <Code className="text-white" size={24} />,
      gradient: 'from-purple-500 to-pink-500',
      delay: 0
    },
    {
      title: t.appDevelopment,
      description: t.appDevelopmentDesc,
      icon: <Smartphone className="text-white" size={24} />,
      gradient: 'from-cyan-500 to-blue-500',
      delay: 200
    },
    {
      title: t.saasDevelopment,
      description: t.saasDevelopmentDesc,
      icon: <Layers className="text-white" size={24} />,
      gradient: 'from-pink-500 to-red-500',
      delay: 400
    },
    {
      title: t.aiIntegration,
      description: t.aiIntegrationDesc,
      icon: <Brain className="text-white" size={24} />,
      gradient: 'from-emerald-500 to-teal-500',
      delay: 600
    }
  ], [t]);

  // Memoize tech icons with original brand colors for both icon and text
  const techIcons = useMemo(() => [
    { 
      icon: Code, 
      label: 'React',
      iconHoverColor: 'group-hover:text-blue-400', // React blue
      textHoverColor: 'group-hover:text-blue-400',
      bgHover: 'group-hover:bg-blue-400/10'
    },
    { 
      icon: Globe, 
      label: 'Next.js',
      iconHoverColor: 'group-hover:text-gray-300', // Next.js gray
      textHoverColor: 'group-hover:text-gray-300',
      bgHover: 'group-hover:bg-gray-300/10'
    },
    { 
      icon: Layers, 
      label: 'Node.js',
      iconHoverColor: 'group-hover:text-green-500', // Node.js green
      textHoverColor: 'group-hover:text-green-500',
      bgHover: 'group-hover:bg-green-500/10'
    },
    { 
      icon: Brain, 
      label: 'AI/ML',
      iconHoverColor: 'group-hover:text-emerald-400', // AI green
      textHoverColor: 'group-hover:text-emerald-400',
      bgHover: 'group-hover:bg-emerald-400/10'
    }
  ], []);

  return (
    <section id="services" className="py-16 md:py-20 relative overflow-hidden">
      {/* Smooth transition from hero section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 via-gray-900/80 to-transparent pointer-events-none z-10"></div>
      
      {/* Background optimized for all screen sizes */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')] bg-cover bg-center opacity-5 md:opacity-10"></div>
        
        {/* Subtle gradient overlays for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-gray-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-transparent to-black/30"></div>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div
          ref={elementRef}
          className={`text-center mb-12 md:mb-16 transform transition-all duration-1000 ${isRTL ? 'rtl' : 'ltr'} ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 ${isRTL ? 'font-arabic' : ''}`}>
            {t.services}
          </h2>
          <p className={`text-gray-300 text-base md:text-lg max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
            {t.aboutDescription}
          </p>
        </div>

        {/* Services grid with proper spacing and alignment */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16 max-w-7xl mx-auto ${isRTL ? 'rtl' : ''}`}>
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              onGetQuote={onGetQuote}
              {...service}
            />
          ))}
        </div>

        {/* Tech icons section with original brand colors for both icons and text */}
        <div className={`grid grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-2xl mx-auto ${isRTL ? 'rtl' : ''}`}>
          {techIcons.map(({ icon: Icon, label, iconHoverColor, textHoverColor, bgHover }, index) => (
            <div 
              key={index}
              className={`flex flex-col items-center gap-2 text-gray-400 transition-all duration-300 cursor-pointer group touch-manipulation p-2 sm:p-3 rounded-lg ${bgHover} justify-center`}
            >
              <Icon size={28} className={`sm:w-8 sm:h-8 md:w-10 md:h-10 group-hover:scale-110 transition-all duration-300 ${iconHoverColor}`} />
              <span className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${textHoverColor}`}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Smooth transition to about section - matching the about section's background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pointer-events-none z-10"></div>
    </section>
  );
};