// tailwind.config.js
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: ['src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'p2p-background': '#f7f7f7',
        'p2p-black': '#000',
        'p2p-dark': '#191a20',
        'p2p-primary': '#3f4150',
        'p2p-secondary': '#8c8d96',
        'p2p-tertiary': '#b2b3b9',
        'p2p-border': '#e0e2e7',
        'p2p-white': '#fff',
        'p2p-purple': {
          DEFAULT: '#7f7fd5',
          light: '#b7b7f9',
          dark: '#6d6dd2',
        },
        'p2p-blue': {
          DEFAULT: '#3da5f5',
          light: '#ecf6fe',
          dark: '#3186c4',
        },
        'p2p-red': {
          DEFAULT: '#f93e3e',
          dark: '#df2b2b',
        },
        'p2p-green': '#22c58b',
        'p2p-mint': '#91EAE4',
      },
      fontFamily: {
        'p2p-main': [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          '"Helvetica Neue"',
          '"Segoe UI"',
          '"Apple SD Gothic Neo"',
          '"Noto Sans KR"',
          '"Malgun Gothic"',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          'sans-serif',
        ],
        'p2p-logo': ['"Bebas Neue"', 'cursive'],
      },
      fontSize: {
        'p2p-12': ['12px', { lineHeight: '16px', letterSpacing: '-0.005em' }],
        'p2p-13': ['13px', { lineHeight: '20px', letterSpacing: '-0.01em' }],
        'p2p-14': ['14px', { lineHeight: '24px', letterSpacing: '-0.01em' }],
        'p2p-16': ['16px', { lineHeight: '24px', letterSpacing: '-0.01em' }],
        'p2p-18': ['18px', { lineHeight: '28px', letterSpacing: '-0.02em' }],
        'p2p-24': ['24px', { lineHeight: '34px', letterSpacing: '-0.01em' }],
      },
      screens: {
        'p2p-sm': '414px',
        'p2p-md': '768px',
        'p2p-lg': '1200px',
      },
    },
  },
};
