/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        slate: {
          450: '#64748b', // standard slate-500
          550: '#475569', // standard slate-600
          650: '#334155', // standard slate-700
          850: '#1e293b', // standard slate-800
        },
        dark: {
          bg: '#030712', // Rich slate/black
          card: '#0f172a', // Zinc slate
          accent: '#8b5cf6', // Violet
          secondary: '#3b82f6', // Bright blue
        },
        light: {
          bg: '#f8fafc',
          card: '#ffffff',
          accent: '#6366f1',
          secondary: '#06b6d4',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
      },
      animation: {
        'aurora': 'aurora 20s linear infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 92, 246, 0.2), 0 0 10px rgba(139, 92, 246, 0.1)' },
          '100%': { boxShadow: '0 0 15px rgba(139, 92, 246, 0.6), 0 0 25px rgba(139, 92, 246, 0.3)' },
        }
      }
    },
  },
  plugins: [
    function({ addVariant }) {
      addVariant('light', '.light &')
    }
  ],
}

