import React from 'react';
import { Code, Search, Users, WholeWord as Wordpress, FileSymlink as Html5, Rss as Css3 } from 'lucide-react';
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
    <section id="services" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')] bg-cover bg-center opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={elementRef}
          className={`text-center mb-16 transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.services}
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t.aboutDescription}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
            />
          ))}
        </div>
        
        {/* Technology Icons */}
        <div className="mt-16 flex justify-center gap-8 flex-wrap">
          <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
            <Wordpress size={32} />
            <span className="text-sm">WordPress</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
            <Html5 size={32} />
            <span className="text-sm">HTML5</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
            <Css3 size={32} />
            <span className="text-sm">CSS3</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
            <Code size={32} />
            <span className="text-sm">PHP</span>
          </div>
        </div>
      </div>
    </section>
  );
};