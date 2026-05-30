import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        // Baseball
        homerun: {
          '0%':   { opacity: '0', transform: 'scale(0.3) translateY(40px)' },
          '18%':  { opacity: '1', transform: 'scale(1.15) translateY(0)' },
          '65%':  { opacity: '1', transform: 'scale(1) translateY(0)' },
          '100%': { opacity: '0', transform: 'scale(0.85) translateY(-30px)' },
        },
        // Football — touchdown (same big energy as home run)
        touchdown: {
          '0%':   { opacity: '0', transform: 'scale(0.2) translateY(50px)' },
          '15%':  { opacity: '1', transform: 'scale(1.2) translateY(0)' },
          '60%':  { opacity: '1', transform: 'scale(1) translateY(0)' },
          '100%': { opacity: '0', transform: 'scale(0.85) translateY(-35px)' },
        },
        // Football — field goal (ball floating up through the uprights)
        fieldgoal: {
          '0%':   { opacity: '0', transform: 'scale(0.4) translateY(80px)' },
          '20%':  { opacity: '1', transform: 'scale(1.05) translateY(0)' },
          '65%':  { opacity: '1', transform: 'scale(1) translateY(0)' },
          '100%': { opacity: '0', transform: 'scale(0.9) translateY(-50px)' },
        },
        // Football — flag thrown (rotational entry, feels like a yellow flag)
        flagthrow: {
          '0%':   { opacity: '0', transform: 'rotate(-50deg) scale(0.3) translate(-50px, -40px)' },
          '22%':  { opacity: '1', transform: 'rotate(10deg) scale(1.15) translate(0, 0)' },
          '38%':  { opacity: '1', transform: 'rotate(-4deg) scale(1) translate(0, 0)' },
          '72%':  { opacity: '1', transform: 'rotate(0deg) scale(1) translate(0, 0)' },
          '100%': { opacity: '0', transform: 'scale(0.9) translateY(-20px)' },
        },
        // Football — interception (slides in from the right, ball stolen mid-air)
        intercept: {
          '0%':   { opacity: '0', transform: 'scale(0.4) translateX(80px) rotate(20deg)' },
          '20%':  { opacity: '1', transform: 'scale(1.15) translateX(0) rotate(-4deg)' },
          '40%':  { opacity: '1', transform: 'scale(1) translateX(0) rotate(0deg)' },
          '72%':  { opacity: '1', transform: 'scale(1) translateX(0)' },
          '100%': { opacity: '0', transform: 'scale(0.9) translateY(-25px)' },
        },
        // Baseball base running — stolen base (fast horizontal dash from left)
        stolenbase: {
          '0%':   { opacity: '0', transform: 'translateX(-120px) scale(0.6) skewX(-10deg)' },
          '18%':  { opacity: '1', transform: 'translateX(12px) scale(1.1) skewX(2deg)' },
          '32%':  { opacity: '1', transform: 'translateX(0) scale(1) skewX(0deg)' },
          '72%':  { opacity: '1', transform: 'translateX(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateX(30px) scale(0.9)' },
        },
        // Baseball base running — double (bounce, like hitting off the wall)
        double: {
          '0%':   { opacity: '0', transform: 'scale(0.4) translateY(40px)' },
          '18%':  { opacity: '1', transform: 'scale(1.15) translateY(0)' },
          '30%':  { opacity: '1', transform: 'scale(0.92) translateY(8px)' },
          '44%':  { opacity: '1', transform: 'scale(1.05) translateY(0)' },
          '72%':  { opacity: '1', transform: 'scale(1) translateY(0)' },
          '100%': { opacity: '0', transform: 'scale(0.9) translateY(-22px)' },
        },
        // Baseball base running — triple (spin, exciting and rare)
        triple: {
          '0%':   { opacity: '0', transform: 'scale(0.2) rotate(-200deg)' },
          '22%':  { opacity: '1', transform: 'scale(1.2) rotate(12deg)' },
          '36%':  { opacity: '1', transform: 'scale(1) rotate(-4deg)' },
          '50%':  { opacity: '1', transform: 'scale(1.04) rotate(1deg)' },
          '65%':  { opacity: '1', transform: 'scale(1) rotate(0deg)' },
          '100%': { opacity: '0', transform: 'scale(0.88) translateY(-28px)' },
        },
        // Shared
        scorePop: {
          '0%':   { transform: 'scale(1)' },
          '30%':  { transform: 'scale(1.5)' },
          '60%':  { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        homerun:      'homerun 2.8s ease-out forwards',
        touchdown:    'touchdown 3s ease-out forwards',
        fieldgoal:    'fieldgoal 2.4s ease-out forwards',
        flagthrow:    'flagthrow 2.6s ease-out forwards',
        intercept:    'intercept 2.6s ease-out forwards',
        stolenbase:   'stolenbase 2.4s ease-out forwards',
        double:       'double 2.4s ease-out forwards',
        triple:       'triple 2.8s ease-out forwards',
        'score-pop':  'scorePop 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config
