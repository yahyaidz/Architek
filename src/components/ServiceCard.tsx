import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../hooks/useLanguage';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  gradient,
  delay = 0
}) => {
  const { elementRef, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  // Les effets de survol ("hover:") de Tailwind ne s'appliquent généralement que lorsque le périphérique supporte le survol (pas sur les écrans tactiles).
  // Nous avons ajusté la taille du texte et la disposition des boutons pour un meilleur rendu mobile.

  return (
    <div
      ref={elementRef}
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Le groupe hover reste pour les effets sur desktop/tablettes */}
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-pink-500/50 transition-all duration-300 group hover:scale-105">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-pink-400 transition-colors">
          {title}
        </h3>

        <p className="text-gray-300 mb-6 leading-relaxed text-sm"> {/* Taille du texte ajustée */}
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4"> {/* Les boutons s'empilent sur les plus petits écrans et s'alignent sur les écrans sm et plus */}
          <button className="px-6 py-2 border border-pink-500 text-pink-400 hover:bg-pink-500 hover:text-white rounded-lg transition-all font-medium text-sm"> {/* Ajout de text-sm */}
            {t.learnMore}
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-all font-medium text-sm"> {/* Ajout de text-sm */}
            {t.getQuote}
          </button>
        </div>
      </div>
    </div>
  );
};