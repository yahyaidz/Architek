import React from 'react';
import { ArrowLeft, Code, Globe, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const WebsiteCreationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-purple-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors"
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
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Code className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Website Creation
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Modern, AI-enhanced websites built with cutting-edge technologies
            </p>
            
            {/* Satisfaction Guarantee */}
            <div className="mt-6 flex justify-center">
              <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 border border-purple-400/30 rounded-full px-6 py-2 backdrop-blur-sm">
                <p className="text-purple-300 text-sm font-medium">
                  ✅ Pay Only Upon Approval
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code size={24} className="text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Modern Tech Stack</h3>
              <p className="text-gray-400 text-sm">React, Next.js, TypeScript</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe size={24} className="text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-400 text-sm">Mobile-first approach</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap size={24} className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Integration</h3>
              <p className="text-gray-400 text-sm">Smart features & automation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield size={24} className="text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Fast</h3>
              <p className="text-gray-400 text-sm">Optimized performance</p>
            </div>
          </div>

          {/* Process */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Discovery & Planning</h3>
                  <p className="text-gray-400">We analyze your requirements and create a detailed project roadmap.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Design & Prototyping</h3>
                  <p className="text-gray-400">Creating beautiful, user-centered designs with modern aesthetics.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Development & AI Integration</h3>
                  <p className="text-gray-400">Building with cutting-edge technologies and AI-powered features.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Testing & Launch</h3>
                  <p className="text-gray-400">Thorough testing and seamless deployment to production.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};