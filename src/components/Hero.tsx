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
        {/* Subtle Grid Pattern - Reduced opacity on mobile */}
        <div 
          className="absolute inset-0 opacity-3 md:opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        />
        
        {/* Terminal Windows - Hidden on small mobile */}
        <div className="hidden sm:block absolute top-10 left-2 md:left-10 w-60 md:w-80 h-36 md:h-48 bg-gray-900/15 md:bg-gray-900/20 border border-gray-700/20 md:border-gray-700/30 rounded-lg backdrop-blur-sm">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 border-b border-gray-700/20 md:border-gray-700/30">
            <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-red-500/50 md:bg-red-500/60"></div>
            <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-yellow-500/50 md:bg-yellow-500/60"></div>
            <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-green-500/50 md:bg-green-500/60"></div>
            <span className="text-gray-400 text-xs ml-1 md:ml-2 font-mono">terminal</span>
          </div>
          {/* Terminal Content */}
          <div className="p-2 md:p-3 font-mono text-xs text-green-400/50 md:text-green-400/60 space-y-1">
            < div >$ npm install react</div>
            <div className="hidden md:block">$ git commit -m "feat: new component"</div>
            < div >$ npm run build</div>
            <div className="text-cyan-400/50 md:text-cyan-400/60">✓ Build successful</div>
          </div>
        </div>
        
        {/* Second Terminal Window - Repositioned for mobile */}
        <div className="hidden sm:block absolute bottom-16 md:bottom-20 right-2 md:right-10 w-56 md:w-72 h-32 md:h-40 bg-gray-900/15 md:bg-gray-900/20 border border-gray-700/20 md:border-gray-700/30 rounded-lg backdrop-blur-sm">
          <div className="flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 border-b border-gray-700/20 md:border-gray-700/30">
            <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-red-500/50 md:bg-red-500/60"></div>
            <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-yellow-500/50 md:bg-yellow-500/60"></div>
            <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-green-500/50 md:bg-green-500/60"></div>
            <span className="text-gray-400 text-xs ml-1 md:ml-2 font-mono">bash</span>
          </div>
          <div className="p-2 md:p-3 font-mono text-xs text-purple-400/50 md:text-purple-400/60 space-y-1">
            < div >$ cd web-runner</div>
            < div >$ npm start</div>
            <div className="text-cyan-400/50 md:text-cyan-400/60">Server running on port 3000</div>
            <div className="animate-pulse">█</div>
          </div>
        </div>
        
        {/* Code Brackets - Reduced and repositioned for mobile */}
        <div className="absolute inset-0">
          {[
            { text: '</>', x: '10%', y: '15%', mobile: true },
            { text: '{}', x: '85%', y: '12%', mobile: true },
            { text: '[]', x: '15%', y: '85%', mobile: true },
            { text: '()', x: '80%', y: '80%', mobile: true },
            { text: '< div >', x: '5%', y: '60%', mobile: false },
            { text: '</div>', x: '90%', y: '45%', mobile: false }
          ].map((item, i) => (
            <div
              key={i}
              className={`absolute text-cyan-400/10 md:text-cyan-400/15 text-lg md:text-2xl font-mono ${
                !item.mobile ? 'hidden md:block' : ''
              }`}
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
        
        {/* Code Keywords - Reduced for mobile */}
        <div className="absolute inset-0">
          {[
            { text: 'const', x: '20%', y: '25%', mobile: true },
            { text: 'function', x: '70%', y: '20%', mobile: false },
            { text: 'return', x: '25%', y: '75%', mobile: true },
            { text: 'import', x: '65%', y: '70%', mobile: false },
            { text: 'export', x: '15%', y: '40%', mobile: false },
            { text: 'async', x: '75%', y: '50%', mobile: true }
          ].map((item, i) => (
            <div
              key={`code-${i}`}
              className={`absolute text-purple-400/8 md:text-purple-400/12 text-xs md:text-sm font-mono ${
                !item.mobile ? 'hidden md:block' : ''
              }`}
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
        
        {/* Scanning Lines - Reduced opacity on mobile */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/10 md:via-cyan-400/20 to-transparent"
            style={{
              animation: 'scanCode 15s linear infinite',
              top: '50%'
            }}
          />
        </div>
      </div>
      
      <div 
        ref={elementRef}
        className={`container mx-auto px-4 text-center relative z-10 transform transition-all duration-1000 safe-area-top ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Mobile-optimized Main Title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent font-mono tracking-tight leading-tight">
            {t.heroTitle}
          </h1>
          
          {/* Mobile-optimized Subtitle */}
          <div className="text-lg sm:text-xl md:text-2xl text-cyan-400 font-light tracking-widest">
            {t.heroSubtitle}
          </div>
          
          {/* Mobile-optimized Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto px-4">
            {t.heroDescription}
          </p>
          
          {/* Mobile-optimized CTA Button */}
          <div className="pt-6 md:pt-8">
            <button className="px-8 sm:px-10 md:px-12 py-3 md:py-4 bg-white text-black hover:bg-cyan-400 hover:text-black font-medium text-base md:text-lg transition-all duration-300 rounded-sm tracking-wide touch-button w-full sm:w-auto">
              {t.getQuote}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
