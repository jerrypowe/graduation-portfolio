/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#FDFCF7',
          100: '#FAF8F0',
          200: '#F4EFE0',
          300: '#EAE1CD',
          400: '#D5C9AE',
        },
        grad: {
          yellow: '#FFD027',
          yellowDark: '#E5B813',
          red: '#E63946',
          ink: '#1E232A',
          navy: '#1D3557',
          blueScript: '#1C3D5A',
          grid: '#E2DCD2',
          chalk: '#8E9AAF',
          gold: '#F59E0B'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Cabinet Grotesk', 'Montserrat', 'Impact', 'Arial Black', 'sans-serif'],
        handwriting: ['Caveat', 'Playpen Sans', 'Patrick Hand', 'cursive'],
        serif: ['Playfair Display', 'Merriweather', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'paper': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'cutout': '3px 4px 0px rgba(24, 28, 36, 0.9)',
        'cutout-lg': '6px 8px 0px rgba(24, 28, 36, 0.95)',
        'cutout-yellow': '5px 5px 0px #FFD027',
        'cutout-red': '4px 4px 0px #E63946',
        'polaroid': '0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'sticker': '0 2px 5px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(8px) rotate(-2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        tassel: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(8deg)' },
          '75%': { transform: 'rotate(-8deg)' }
        }
      },
      animation: {
        'float-slow': 'float 5s ease-in-out infinite',
        'float-medium': 'float 3.5s ease-in-out infinite',
        'float-reverse': 'float-reverse 4s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'tassel': 'tassel 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
