import React from 'react';
import { ArrowLeft, Layers, Cloud, Database, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SaasDevelopmentPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-pink-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white hover:text-pink-400 transition-colors"
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
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Layers className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
              SaaS Development
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              AI-powered SaaS solutions with machine learning and intelligent automation
            </p>
            
            {/* Satisfaction Guarantee */}
            <div className="mt-6 flex justify-center">
              <div className="bg-gradient-to-r from-pink-500/20 via-red-500/20 to-pink-500/20 border border-pink-400/30 rounded-full px-6 py-2 backdrop-blur-sm">
                <p className="text-pink-300 text-sm font-medium">
                  ✓ Pay only at the end if you are satisfied
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
              <h3 className="text-lg font-semibold mb-2">Scalable Architecture</h3>
              <p className="text-gray-400 text-sm">Built for growth</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cloud size={24} className="text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cloud-Native</h3>
              <p className="text-gray-400 text-sm">Modern infrastructure</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database size={24} className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Data Intelligence</h3>
              <p className="text-gray-400 text-sm">AI-driven insights</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart size={24} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Analytics</h3>
              <p className="text-gray-400 text-sm">Real-time metrics</p>
            </div>
          </div>

          {/* Process */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Development Journey</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Business Analysis</h3>
                  <p className="text-gray-400">Understanding your business model and defining SaaS requirements.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Architecture & Design</h3>
                  <p className="text-gray-400">Scalable system architecture with modern design patterns.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Development</h3>
                  <p className="text-gray-400">Building with machine learning capabilities and intelligent automation.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Launch & Scale</h3>
                  <p className="text-gray-400">Cloud deployment with monitoring and continuous optimization.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};