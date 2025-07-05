import React from 'react';
import { Code, Search, Users, Smartphone, Globe, Palette } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Services: React.FC = () => {
  const { t } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();
  
  const services = [
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
  ];
  
  return (
    <section id="services" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')] bg-cover bg-center opacity-3 md:opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={elementRef}
          className={`text-center mb-12 md:mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 px-4">
            {t.services}
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto px-4">
            {t.aboutDescription}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
            />
          ))}
        </div>
        
        {/* Technology Icons - Mobile optimized */}
        <div className="mt-12 md:mt-16 flex justify-center gap-4 md:gap-8 flex-wrap px-4">
          <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer p-2 touch-button">
            <Smartphone size={24} className="md:hidden" />
            <Globe size={32} className="hidden md:block" />
            <span className="text-xs md:text-sm">Mobile</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer p-2 touch-button">
            <Code size={24} className="md:hidden" />
            <Code size={32} className="hidden md:block" />
            <span className="text-xs md:text-sm">React</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer p-2 touch-button">
            <Palette size={24} className="md:hidden" />
            <Palette size={32} className="hidden md:block" />
            <span className="text-xs md:text-sm">Design</span>
          </div>
          <div className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer p-2 touch-button">
            <Search size={24} className="md:hidden" />
            <Search size={32} className="hidden md:block" />
            <span className="text-xs md:text-sm">SEO</span>
          </div>
        </div>
      </div>
    </section>
  );
};
