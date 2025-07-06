import React, { useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
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
      {/* Simplified background for mobile */}
      <div className="absolute inset-0 bg-black">
        {/* Lightweight grid pattern - only on larger screens */}
        <div
          className="absolute inset-0 opacity-5 hidden lg:block"
          style={{
            backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Terminal windows - hidden on mobile and tablet */}
        <div className="absolute top-10 left-10 w-80 h-48 bg-gray-900/20 border border-gray-700/30 rounded-lg backdrop-blur-sm hidden xl:block">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-700/30">
            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
            <span className="text-gray-400 text-xs ml-2 font-mono">terminal</span>
          </div>
          <div className="p-3 font-mono text-xs text-green-400/60 space-y-1">
            <div>$ npm install react</div>
            <div>$ git commit -m "feat: new component"</div>
            <div>$ npm run build</div>
            <div className="text-cyan-400/60">✓ Build successful</div>
          </div>
        </div>

        <div className="absolute bottom-20 right-10 w-72 h-40 bg-gray-900/20 border border-gray-700/30 rounded-lg backdrop-blur-sm hidden xl:block">
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

        <div className="absolute top-1/2 left-5 w-64 h-32 bg-gray-900/15 border border-gray-700/20 rounded-lg backdrop-blur-sm transform -translate-y-1/2 hidden xl:block">
          <div className="flex items-center gap-2 px-3 py-1 border-b border-gray-700/20">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            <span className="text-gray-500 text-xs ml-1 font-mono">App.tsx</span>
          </div>
          <div className="p-2 font-mono text-xs space-y-1">
            {codeElements.map((line, i) => (
              <div key={i} className={`${
                i === 0 ? 'text-purple-400/50' : 
                i === 1 || i === 3 ? 'text-cyan-400/50' : 
                'text-green-400/50 ml-2'
              }`}>
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Floating elements - only on desktop */}
        <div className="absolute inset-0 hidden xl:block">
          {floatingElements.brackets.map((item, i) => (
            <div
              key={`bracket-${i}`}
              className="absolute text-cyan-400/15 text-2xl font-mono will-change-transform"
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

          {floatingElements.keywords.map((item, i) => (
            <div
              key={`keyword-${i}`}
              className="absolute text-purple-400/12 text-sm font-mono will-change-transform"
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
              className="absolute text-green-400/10 text-xs font-mono will-change-transform"
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
              className="absolute text-pink-400/12 text-lg font-mono will-change-transform"
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

        {/* Scan lines - only on desktop */}
        <div className="absolute inset-0 hidden xl:block">
          <div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent will-change-transform"
            style={{
              animation: 'scanCode 15s linear infinite',
              top: '50%'
            }}
          />
          <div
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400/15 to-transparent will-change-transform"
            style={{
              animation: 'scanCode 20s linear infinite reverse',
              top: '30%'
            }}
          />
        </div>
      </div>

      {/* Main content - optimized for mobile */}
      <div
        ref={elementRef}
        className={`container mx-auto px-4 text-center relative z-10 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          {/* Responsive title with better mobile sizing */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent font-mono tracking-tight leading-tight">
            {t.heroTitle}
          </h1>

          <div className="text-lg sm:text-xl md:text-2xl text-cyan-400 font-light tracking-widest">
            {t.heroSubtitle}
          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
            {t.heroDescription}
          </p>

          <div className="pt-6 md:pt-8">
            <button className="px-6 py-3 sm:px-8 sm:py-3 md:px-10 text-base sm:text-lg md:text-xl bg-white text-black hover:bg-cyan-400 hover:text-black font-medium transition-all duration-300 rounded-sm tracking-wide touch-manipulation">
              {t.getQuote}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};