import React from 'react';
import { MapPin, Phone, Mail, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Arrière-plan */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')] bg-cover bg-center opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={elementRef}
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Modification de la disposition en grille pour une meilleure réactivité mobile */}
          {/* Par défaut sur 1 colonne, 2 colonnes sur les petits écrans, 4 colonnes sur les écrans moyens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Lyon Office */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-pink-500/50 transition-all">
              <h3 className="text-pink-400 font-bold mb-4 text-lg">{t.lyonOffice}</h3>
              <div className="text-2xl font-bold text-white mb-4">WEB RUNNER</div>
              <div className="text-gray-300 mb-2">57 Place de la République</div>
              <div className="text-gray-300 mb-4">69002 LYON</div>
              <div className="flex items-center gap-2 text-white text-sm"> {/* Ajout de text-sm pour une meilleure lisibilité */}
                <Phone size={16} />
                <span>04 72 54 71 01</span>
              </div>
            </div>

            {/* Paris Office */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-cyan-500/50 transition-all">
              <h3 className="text-cyan-400 font-bold mb-4 text-lg">{t.parisOffice}</h3>
              <div className="text-2xl font-bold text-white mb-4">WEB RUNNER</div>
              <div className="text-gray-300 mb-2">58 Rue de Monceau</div>
              <div className="text-gray-300 mb-4">75008 PARIS</div>
              <div className="flex items-center gap-2 text-white text-sm"> {/* Ajout de text-sm */}
                <Phone size={16} />
                <span>01 88 90 75 08</span>
              </div>
            </div>

            {/* Our Solutions */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all">
              <h3 className="text-purple-400 font-bold mb-4 text-lg">{t.ourSolutions}</h3>
              <div className="space-y-2 text-gray-300 text-sm"> {/* Ajout de text-sm */}
                <div>{t.webDesign}</div>
                <div>{t.googleSeo}</div>
                <div>{t.communityMgmt}</div>
                <div>{t.virtualTour}</div>
                <div>{t.virtualReality}</div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-pink-500/50 transition-all">
              <h3 className="text-pink-400 font-bold mb-4 text-lg">{t.followUs}</h3>
              <div className="flex gap-4 mb-4">
                <Instagram className="text-pink-400 hover:text-pink-300 cursor-pointer transition-colors" size={24} />
                <Linkedin className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors" size={24} />
                <Facebook className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors" size={24} />
                <Youtube className="text-red-400 hover:text-red-300 cursor-pointer transition-colors" size={24} />
              </div>
              <div className="text-gray-300 text-sm mb-4">{t.dontMiss}</div>
              <button className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg font-medium w-full transition-all text-sm"> {/* Ajout de text-sm */}
                {t.getQuote}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};