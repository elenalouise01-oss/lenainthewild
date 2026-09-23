import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FFFAEC',
        sand: '#f1efe7',
        linen: '#e6e6dd',
        porcelain: '#f4e9dc',
        blush: '#e8cfc1',
        rose: '#edb8b6',
        bark: '#3b2d0e',
        umber: '#52421b',
        sage: '#366560',
        stone: '#7b776f',
        zing: {
          yellow: '#fffba0',
          pink: '#ff8bb8',
          green: '#bee5b0',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        logo: ['var(--font-giaza)', 'var(--font-bodoni)', 'serif'],
        script: ['var(--font-biro)', 'var(--font-gochi)', 'cursive'],
        hand: ['var(--font-gochi)', 'cursive'],
        fifindrel: ['var(--font-fifindrel)', 'var(--font-gochi)', 'cursive'],
      },
      fontSize: {
        'display-1': ['clamp(4.5rem, 22vw, 14rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display-2': ['clamp(2.75rem, 6.5vw, 6.5rem)', { lineHeight: '0.95', letterSpacing: '-0.015em' }],
        'display-3': ['clamp(2.25rem, 4.5vw, 4.25rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
        'display-4': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.05' }],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      maxWidth: {
        content: '1440px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin 16s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
