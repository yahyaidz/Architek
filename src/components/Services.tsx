import React, { useMemo } from 'react';
import { Code, Search, Users, Globe, Palette, Smartphone } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Services: React.FC = () => {
  const { t } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();

  // Memoize services data to prevent re-creation
  const services = useMemo(() => [
    {
      title: t.webDevelopment,
      description: t.webDevelopmentDesc,
      icon: <Code className="text-white" size={24} />,
      gradient: 'from-purple-500 to-pink-500',
      delay: 0
    },
    {
      title: t.seoSea,
      description: t.seoSeaDesc,
      icon: <Search className="text-white" size={24} />,
      gradient: 'from-cyan-500 to-blue-500',
      delay: 200
    },
    {
      title: t.communityManagement,
      description: t.communityManagementDesc,
      icon: <Users className="text-white" size={24} />,
      gradient: 'from-pink-500 to-red-500',
      delay: 400
    }
  ], [t]);

  // Memoize tech icons
  const techIcons = useMemo(() => [
    { icon: Globe, label: 'WordPress' },
    { icon: Code, label: 'HTML5' },
    { icon: Palette, label: 'CSS3' },
    { icon: Smartphone, label: 'Mobile' }
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
          className={`text-center mb-12 md:mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            {t.services}
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
            {t.aboutDescription}
          </p>
        </div>

        {/* Services grid with proper spacing and alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
            />
          ))}
        </div>

        {/* Tech icons section */}
        <div className="flex justify-center items-center gap-6 sm:gap-8 md:gap-12 flex-wrap max-w-4xl mx-auto">
          {techIcons.map(({ icon: Icon, label }, index) => (
            <div 
              key={index}
              className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer group touch-manipulation"
            >
              <Icon size={32} className="md:w-10 md:h-10 group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-gray-900/80 to-transparent pointer-events-none z-10"></div>
    </section>
  );
};