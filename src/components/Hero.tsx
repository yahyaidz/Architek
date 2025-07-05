import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();
  
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background with Terminal Style */}
      <div className="absolute inset-0 bg-black">
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Terminal Windows */}
        <div className="absolute top-10 left-10 w-80 h-48 bg-gray-900/20 border border-gray-700/30 rounded-lg backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700/30">
            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
            <span className="text-gray-400 text-xs ml-2 font-mono">terminal</span>
          </div>
          {/* Terminal Content */}
          <div className="p-3 font-mono text-xs text-green-400/60 space-y-1">
            <div>$ npm install react</div>
            <div>$ git commit -m "feat: new component"</div>
            <div>$ npm run build</div>
            <div className="text-cyan-400/60">✓ Build successful</div>
          </div>
        </div>
        
        {/* Second Terminal Window */}
        <div className="absolute bottom-20 right-10 w-72 h-40 bg-gray-900/20 border border-gray-700/30 rounded-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700/30">
            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
            <span className="text-gray-400 text-xs ml-2 font-mono">bash</span>
          </div>
          <div className="p-3 font-mono text-xs text-purple-400/60 space-y-1">
            <div>$ cd web-runner</div>
            <div>$ npm start</div>
            <div className="text-cyan-400/60">Server running on port 3000</div>
            <div className="animate-pulse">█</div>
          </div>
        </div>
        
        {/* Code Editor Window */}
        <div className="absolute top-1/2 left-5 w-64 h-32 bg-gray-900/15 border border-gray-700/20 rounded-lg backdrop-blur-sm transform -translate-y-1/2">
          <div className="flex items-center gap-2 px-3 py-1 border-b border-gray-700/20">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            <span className="text-gray-500 text-xs ml-1 font-mono">App.tsx</span>
          </div>
          <div className="p-2 font-mono text-xs space-y-1">
            <div className="text-purple-400/50">import React from 'react';</div>
            <div className="text-cyan-400/50">function App() &lbrace;</div>
            <div className="text-green-400/50 ml-2">return &lt;div&gt;Hello&lt;/div&gt;</div>
            <div className="text-cyan-400/50">&rbrace;</div>
          </div>
        </div>
        
        {/* Code Brackets */}
        <div className="absolute inset-0">
          {[
            { text: '</>', x: '15%', y: '20%' },
            { text: '{}', x: '85%', y: '15%' },
            { text: '[]', x: '20%', y: '80%' },
            { text: '()', x: '80%', y: '75%' },
            { text: '<div>', x: '8%', y: '60%' },
            { text: '</div>', x: '90%', y: '45%' }
          ].map((item, i) => (
            <div
              key={i}
              className="absolute text-cyan-400/15 text-2xl font-mono"
              style={{
                left: item.x,
                top: item.y,
                animation: `floatBracket ${8 + i}s ease-in-out infinite`,
                animationDelay: `${i * 2}s`
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
        
        {/* Code Keywords */}
        <div className="absolute inset-0">
          {[
            { text: 'const', x: '25%', y: '30%' },
            { text: 'function', x: '70%', y: '25%' },
            { text: 'return', x: '30%', y: '70%' },
            { text: 'import', x: '65%', y: '65%' },
            { text: 'export', x: '18%', y: '45%' },
            { text: 'async', x: '78%', y: '55%' }
          ].map((item, i) => (
            <div
              key={`code-${i}`}
              className="absolute text-purple-400/12 text-sm font-mono"
              style={{
                left: item.x,
                top: item.y,
                animation: `floatBracket ${10 + i}s ease-in-out infinite`,
                animationDelay: `${i * 1.5}s`
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
        
        {/* Terminal Commands */}
        <div className="absolute inset-0">
          {[
            { text: '$ npm run dev', x: '12%', y: '35%' },
            { text: '$ git push', x: '82%', y: '30%' },
            { text: '$ yarn build', x: '22%', y: '65%' },
            { text: '$ code .', x: '72%', y: '70%' }
          ].map((item, i) => (
            <div
              key={`terminal-${i}`}
              className="absolute text-green-400/10 text-xs font-mono"
              style={{
                left: item.x,
                top: item.y,
                animation: `floatBracket ${12 + i}s ease-in-out infinite`,
                animationDelay: `${i * 3}s`
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
        
        {/* Operators */}
        <div className="absolute inset-0">
          {[
            { text: ';', x: '35%', y: '25%' },
            { text: '=>', x: '60%', y: '35%' },
            { text: '&&', x: '40%', y: '75%' },
            { text: '||', x: '55%', y: '80%' },
            { text: '===', x: '28%', y: '50%' },
            { text: '!==', x: '68%', y: '40%' }
          ].map((item, i) => (
            <div
              key={`operator-${i}`}
              className="absolute text-pink-400/12 text-lg font-mono"
              style={{
                left: item.x,
                top: item.y,
                animation: `floatBracket ${9 + i}s ease-in-out infinite`,
                animationDelay: `${i * 2.5}s`
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
        
        {/* Scanning Lines */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            style={{
              animation: 'scanCode 15s linear infinite',
              top: '50%'
            }}
          />
          <div 
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400/15 to-transparent"
            style={{
              animation: 'scanCode 20s linear infinite reverse',
              top: '30%'
            }}
          />
        </div>
      </div>
      
      <div 
        ref={elementRef}
        className={`container mx-auto px-4 text-center relative z-10 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Clean Main Title */}
          <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent font-mono tracking-tight">
            {t.heroTitle}
          </h1>
          
          {/* Simple Subtitle */}
          <div className="text-xl md:text-2xl text-cyan-400 font-light tracking-widest">
            {t.heroSubtitle}
          </div>
          
          {/* Clean Description */}
          <p className="text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto">
            {t.heroDescription}
          </p>
          
          {/* Single CTA Button */}
          <div className="pt-8">
            <button className="px-12 py-4 bg-white text-black hover:bg-cyan-400 hover:text-black font-medium text-lg transition-all duration-300 rounded-sm tracking-wide">
              {t.getQuote}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};