import React from 'react';
import { ArrowLeft, Brain, Zap, Target, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AIIntegrationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-emerald-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Home</span>
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
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              AI Integration
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Cutting-edge AI technologies including GPT models and machine learning algorithms
            </p>
            
            {/* Satisfaction Guarantee */}
            <div className="mt-6 flex justify-center">
              <div className="bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 border border-emerald-400/30 rounded-full px-6 py-2 backdrop-blur-sm">
                <p className="text-emerald-300 text-sm font-medium">
                  ✓ Pay only at the end if you are satisfied
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain size={24} className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Machine Learning</h3>
              <p className="text-gray-400 text-sm">Custom ML models</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={24} className="text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Automation</h3>
              <p className="text-gray-400 text-sm">Intelligent workflows</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={24} className="text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Precision</h3>
              <p className="text-gray-400 text-sm">Accurate predictions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb size={24} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-gray-400 text-sm">Latest AI advances</p>
            </div>
          </div>

          {/* Process */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">AI Implementation Process</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI Strategy & Assessment</h3>
                  <p className="text-gray-400">Analyzing your needs and identifying AI opportunities for maximum impact.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Model Selection & Training</h3>
                  <p className="text-gray-400">Choosing the right AI models and training them with your specific data.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Integration & Optimization</h3>
                  <p className="text-gray-400">Seamlessly integrating AI into your existing systems with performance optimization.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Monitoring & Evolution</h3>
                  <p className="text-gray-400">Continuous monitoring and model improvement for sustained performance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};