import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          light: {
            bg: '#FFFFFF',
            surface: '#F8FAFC',
            text: '#0F172A',
            border: '#E2E8F0',
          },
          dark: {
            bg: '#0B0F19',
            surface: '#0F172A',
            text: '#F8FAFC',
            border: '#1E293B',
          },
        },
        ozone: {
          50: '#f0fbfd',
          100: '#ecfeff',
          200: '#cffafe',
          300: '#a5f3fc',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        neon: {
          400: '#22d3ee',
          500: '#06b6d4',
        }
      },
      boxShadow: {
        'bento': '0 4px 30px rgba(0, 0, 0, 0.03)',
        'bento-hover': '0 10px 40px rgba(0, 0, 0, 0.06)',
        'bento-dark': '0 4px 30px rgba(0, 0, 0, 0.2)',
        'bento-dark-hover': '0 10px 40px rgba(0, 0, 0, 0.4)',
        'glow': '0 0 20px rgba(6, 182, 212, 0.15)',
        'glow-strong': '0 0 35px rgba(6, 182, 212, 0.3)',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'sans-serif'],
        display: ['Be Vietnam Pro', 'sans-serif'],
        mono: ['Be Vietnam Pro', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'scroll-down': 'scrollDown 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollDown: {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '50%': { transform: 'translateY(6px)', opacity: '0.3' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
    },
  },
  plugins: [],
};

export default config;
