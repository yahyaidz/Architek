import React from 'react';
import { ArrowLeft, Layers, Cloud, Database, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

export const SaasDevelopmentPage: React.FC = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-black text-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-pink-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white hover:text-pink-400 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className={isRTL ? 'font-arabic' : ''}>{t.backToHome}</span>
            </button>
            <div className="text-xl font-bold bg-gradient-to-r from-pink-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ARCHITEK
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Layers className="text-white" size={32} />
            </div>
            <h1 className={`text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent ${isRTL ? 'font-arabic' : ''}`}>
              {t.saasDevelopmentTitle}
            </h1>
            <p className={`text-xl text-gray-300 max-w-2xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {t.saasDevelopmentSubtitle}
            </p>
            
            {/* Satisfaction Guarantee */}
            <div className="mt-6 flex justify-center">
              <div className="bg-gradient-to-r from-pink-500/20 via-red-500/20 to-pink-500/20 border border-pink-400/30 rounded-full px-6 py-2 backdrop-blur-sm">
                <p className={`text-pink-300 text-sm font-medium ${isRTL ? 'font-arabic' : ''}`}>
                  ✅ {t.payOnlyUponApproval}
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers size={24} className="text-pink-400" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>{t.scalableArchitecture}</h3>
              <p className={`text-gray-400 text-sm ${isRTL ? 'font-arabic' : ''}`}>{t.scalableArchitectureDesc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud size={24} className="text-cyan-400" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>{t.cloudNative}</h3>
              <p className={`text-gray-400 text-sm ${isRTL ? 'font-arabic' : ''}`}>{t.cloudNativeDesc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database size={24} className="text-emerald-400" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>{t.dataIntelligence}</h3>
              <p className={`text-gray-400 text-sm ${isRTL ? 'font-arabic' : ''}`}>{t.dataIntelligenceDesc}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart size={24} className="text-purple-400" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>{t.analytics}</h3>
              <p className={`text-gray-400 text-sm ${isRTL ? 'font-arabic' : ''}`}>{t.analyticsDesc}</p>
            </div>
          </div>

          {/* Process */}
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-bold text-center mb-12 ${isRTL ? 'font-arabic' : ''}`}>{t.developmentJourney}</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                < div >
                  <h3 className={`text-xl font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>{t.businessAnalysis}</h3>
                  <p className={`text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>{t.businessAnalysisDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                < div >
                  <h3 className={`text-xl font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>{t.architectureDesign}</h3>
                  <p className={`text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>{t.architectureDesignDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                < div >
                  <h3 className={`text-xl font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>{t.aiPoweredDevelopment}</h3>
                  <p className={`text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>{t.aiPoweredDevelopmentDesc}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                < div >
                  <h3 className={`text-xl font-semibold mb-2 ${isRTL ? 'font-arabic' : ''}`}>{t.launchScale}</h3>
                  <p className={`text-gray-400 ${isRTL ? 'font-arabic' : ''}`}>{t.launchScaleDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
