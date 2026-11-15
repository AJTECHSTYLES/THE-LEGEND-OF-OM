/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fdfbf7',
          100: '#fbf7ee',
          200: '#f5ecd6',
          300: '#ebdcb6',
          400: '#dfc592',
          500: '#cfa968',
          600: '#be8e4f',
          700: '#9e6e3c',
          800: '#815734',
          900: '#6b472e',
        },
        antique: {
          dark: '#14100c',
          wood: '#251b14',
          woodDark: '#1a130e',
          brass: '#d4af37',
          brassLight: '#f3e5ab',
          brassDark: '#997d25',
          wax: '#8b1e1e',
          waxBright: '#b22222',
          ink: '#1c1917',
        },
        ocean: {
          glow: '#38bdf8',
          cyan: '#06b6d4',
          deep: '#0c2340',
          trench: '#04101e',
        },
        storm: {
          lightning: '#facc15',
          gold: '#eab308',
          amber: '#f59e0b',
          cloud: '#1e293b',
          dark: '#0f172a',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        handwriting: ['"Caveat"', '"Marck Script"', '"Brush Script MT"', 'cursive'],
        body: ['"Spectral"', '"Georgia"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '0.92', filter: 'brightness(1)' },
          '25%': { opacity: '0.98', filter: 'brightness(1.08)' },
          '50%': { opacity: '0.88', filter: 'brightness(0.96)' },
          '75%': { opacity: '0.95', filter: 'brightness(1.04)' },
        },
        drift: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1deg)' },
          '100%': { transform: 'translateY(0px) rotate(0deg)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.03)' },
        }
      },
      animation: {
        'flicker': 'flicker 4s infinite ease-in-out',
        'drift': 'drift 8s infinite ease-in-out',
        'pulse-slow': 'pulseSlow 5s infinite ease-in-out',
      }
    },
  },
  plugins: [],
};
