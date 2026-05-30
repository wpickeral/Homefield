import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        homerun: {
          '0%':   { opacity: '0', transform: 'scale(0.3) translateY(40px)' },
          '18%':  { opacity: '1', transform: 'scale(1.15) translateY(0)' },
          '65%':  { opacity: '1', transform: 'scale(1) translateY(0)' },
          '100%': { opacity: '0', transform: 'scale(0.85) translateY(-30px)' },
        },
        scorePop: {
          '0%':   { transform: 'scale(1)' },
          '30%':  { transform: 'scale(1.5)' },
          '60%':  { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        homerun:   'homerun 2.8s ease-out forwards',
        'score-pop': 'scorePop 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
