/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(6, 182, 212, 0.3)',
        'pink-glow': '0 0 20px rgba(236, 72, 153, 0.3)',
        'purple-glow': '0 0 20px rgba(168, 85, 247, 0.3)',
      }
    },
  },
  plugins: [],
};