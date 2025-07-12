import React, { useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface HeroProps {
  onGetQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetQuote }) => {
  const { t, isRTL } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();

  // Memoize code strings to prevent re-creation on every render
  const codeElements = useMemo(() => [
    "import React from 'react';",
    "function App() {",
    "return <div>Hello</div>",
    "}"
  ], []);

  // Memoize floating elements data
  const floatingElements = useMemo(() => ({
    brackets: [
      { text: '</>', x: '15%', y: '20%' },
      { text: '{}', x: '85%', y: '15%' },
      { text: '[]', x: '20%', y: '80%' },
      { text: '()', x: '80%', y: '75%' },
      { text: '<div>', x: '8%', y: '60%' },
      { text: '</div>', x: '90%', y: '45%' }
    ],
    keywords: [
      { text: 'const', x: '25%', y: '30%' },
      { text: 'function', x: '70%', y: '25%' },
      { text: 'return', x: '30%', y: '70%' },
      { text: 'import', x: '65%', y: '65%' },
      { text: 'export', x: '18%', y: '45%' },
      { text: 'async', x: '78%', y: '55%' }
    ],
    commands: [
      { text: '$ npm run dev', x: '12%', y: '35%' },
      { text: '$ git push', x: '82%', y: '30%' },
      { text: '$ yarn build', x: '22%', y: '65%' },
      { text: '$ code .', x: '72%', y: '70%' }
    ],
    operators: [
      { text: ';', x: '35%', y: '25%' },
      { text: '=>', x: '60%', y: '35%' },
      { text: '&&', x: '40%', y: '75%' },
      { text: '||', x: '55%', y: '80%' },
      { text: '===', x: '28%', y: '50%' },
      { text: '!==', x: '68%', y: '40%' }
    ]
  }), []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dynamic gradient background with animated elements */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        
        {/* Animated gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-cyan-900/20 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/10 via-transparent to-purple-900/10"></div>
        
        {/* Radial gradients for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-pink-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>

        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          {/* Grid pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Diagonal lines */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(45deg, rgba(236, 72, 153, 0.05) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(168, 85, 247, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px'
            }}
          />
        </div>

        {/* Floating orbs - visible on larger screens */}
        <div className="absolute inset-0 hidden lg:block">
          <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400/30 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-pink-400/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-40 w-5 h-5 bg-purple-400/30 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-green-400/30 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Terminal windows - enhanced design */}
        <div className="absolute top-10 left-10 w-80 h-48 bg-gray-900/30 border border-gray-700/50 rounded-lg backdrop-blur-md shadow-2xl hidden xl:block">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700/50 bg-gray-800/50">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="text-gray-400 text-xs ml-2 font-mono">terminal</span>
          </div>
          <div className="p-3 font-mono text-xs text-green-400/80 space-y-1">
            <div>$ npm install react</div>
            <div>$ git commit -m "feat: AI integration"</div>
            <div>$ npm run build</div>
            <div className="text-cyan-400/80">✓ Build successful</div>
            <div className="text-emerald-400/80">🤖 AI models loaded</div>
          </div>
        </div>

        <div className="absolute bottom-20 right-10 w-72 h-40 bg-gray-900/30 border border-gray-700/50 rounded-lg backdrop-blur-md shadow-2xl hidden xl:block">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700/50 bg-gray-800/50">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="text-gray-400 text-xs ml-2 font-mono">bash</span>
          </div>
          <div className="p-3 font-mono text-xs text-purple-400/80 space-y-1">
            <div>$ cd architek-ai</div>
            <div>$ npm start</div>
            <div className="text-cyan-400/80">Server running on port 3000</div>
            <div className="text-emerald-400/80">AI services: online</div>
            <div className="animate-pulse">█</div>
          </div>
        </div>

        <div className="absolute top-1/2 left-5 w-64 h-32 bg-gray-900/25 border border-gray-700/40 rounded-lg backdrop-blur-md shadow-2xl transform -translate-y-1/2 hidden xl:block">
          <div className="flex items-center gap-2 px-3 py-1 border-b border-gray-700/40 bg-gray-800/40">
            <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/70"></div>
            <span className="text-gray-500 text-xs ml-1 font-mono">App.tsx</span>
          </div>
          <div className="p-2 font-mono text-xs space-y-1">
            {codeElements.map((line, i) => (
              <div key={i} className={`${
                i === 0 ? 'text-purple-400/70' : 
                i === 1 || i === 3 ? 'text-cyan-400/70' : 
                'text-green-400/70 ml-2'
              }`}>
                {line}
              </div>
            ))}
            <div className="text-emerald-400/70 ml-2">useAI()</div>
          </div>
        </div>

        {/* Enhanced floating elements */}
        <div className="absolute inset-0 hidden xl:block">
          {floatingElements.brackets.map((item, i) => (
            <div
              key={`bracket-${i}`}
              className="absolute text-cyan-400/20 text-2xl font-mono will-change-transform"
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

          {/* AI-specific floating elements */}
          <div className="absolute top-1/4 right-1/3 text-emerald-400/15 text-lg font-mono will-change-transform" style={{ animation: 'floatBracket 12s ease-in-out infinite' }}>
            AI()
          </div>
          <div className="absolute bottom-1/3 left-1/4 text-purple-400/15 text-sm font-mono will-change-transform" style={{ animation: 'floatBracket 15s ease-in-out infinite', animationDelay: '3s' }}>
            neural.network
          </div>
          <div className="absolute top-1/2 right-1/5 text-teal-400/15 text-base font-mono will-change-transform" style={{ animation: 'floatBracket 10s ease-in-out infinite', animationDelay: '5s' }}>
            ML.predict()
          </div>
          <div className="absolute bottom-1/4 right-1/3 text-emerald-400/15 text-xs font-mono will-change-transform" style={{ animation: 'floatBracket 14s ease-in-out infinite', animationDelay: '7s' }}>
            GPT-4
          </div>

          {floatingElements.keywords.map((item, i) => (
            <div
              key={`keyword-${i}`}
              className="absolute text-purple-400/15 text-sm font-mono will-change-transform"
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

          {floatingElements.commands.map((item, i) => (
            <div
              key={`command-${i}`}
              className="absolute text-green-400/12 text-xs font-mono will-change-transform"
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

          {floatingElements.operators.map((item, i) => (
            <div
              key={`operator-${i}`}
              className="absolute text-pink-400/15 text-lg font-mono will-change-transform"
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

        {/* Enhanced scan lines */}
        <div className="absolute inset-0 hidden xl:block">
          <div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent will-change-transform"
            style={{
              animation: 'scanCode 15s linear infinite',
              top: '50%'
            }}
          />
          <div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent will-change-transform"
            style={{
              animation: 'scanCode 20s linear infinite reverse',
              top: '30%'
            }}
          />
          <div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-pink-400/25 to-transparent will-change-transform"
            style={{
              animation: 'scanCode 25s linear infinite',
              top: '70%'
            }}
          />
        </div>

        {/* Mobile-optimized background elements */}
        <div className="absolute inset-0 xl:hidden">
          <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-gradient-to-br from-pink-500/10 to-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-to-br from-purple-500/8 to-pink-500/8 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* Smooth transition overlay - creates seamless blend to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent pointer-events-none z-20"></div>

      {/* Main content */}
      <div
        ref={elementRef}
        className={`container mx-auto px-4 text-center relative z-10 transform transition-all duration-1000 ${isRTL ? 'rtl' : 'ltr'} ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Enhanced title with better gradient */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent ${isRTL ? 'font-arabic' : 'font-mono'} tracking-tight leading-tight drop-shadow-2xl`}>
            {t.heroTitle}
          </h1>

          <div className={`text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent font-light ${isRTL ? 'font-arabic' : 'tracking-widest'} drop-shadow-lg`}>
            {t.heroSubtitle}
          </div>

          <p className={`text-base sm:text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed drop-shadow-lg ${isRTL ? 'font-arabic' : ''}`}>
            {t.heroDescription}
          </p>

          {/* Satisfaction Guarantee Badge */}
          <div className="flex justify-center pt-4">
            <div className="bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 border border-emerald-400/30 rounded-full px-4 py-2 backdrop-blur-sm">
              <p className={`text-emerald-300 text-sm font-medium ${isRTL ? 'font-arabic' : ''}`}>
                ✅ {t.satisfactionGuarantee}
              </p>
            </div>
          </div>

          <div className="pt-6 md:pt-8">
            <button 
              onClick={onGetQuote}
              className={`px-6 py-3 sm:px-8 sm:py-3 md:px-10 text-base sm:text-lg md:text-xl bg-gradient-to-r from-white via-emerald-100 to-cyan-100 text-black hover:from-emerald-400 hover:via-cyan-400 hover:to-emerald-400 hover:text-black font-medium transition-all duration-300 rounded-sm ${isRTL ? 'font-arabic' : 'tracking-wide'} touch-manipulation shadow-2xl hover:shadow-emerald-400/25 transform hover:scale-105`}
            >
              {t.getQuote}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
