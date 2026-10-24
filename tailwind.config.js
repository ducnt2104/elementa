/** @type {import('tailwindcss').Config} */
export default {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#10131B',
        navy: {
          DEFAULT: '#172231',
          light: '#233348',
          dark: '#0D141E',
        },
        ivory: {
          DEFAULT: '#E8E0D1',
          muted: '#B0A898',
          bright: '#FDFBF7',
        },
        copper: {
          DEFAULT: '#C67A45',
          dark: '#935328',
          light: '#DE996A',
        },
        cyan: {
          ion: '#57C8C8',
          dim: '#328888',
        },
        lime: {
          mineral: '#B4CD70',
          dark: '#7D953E',
        },
        coral: {
          reaction: '#F06A55',
          dark: '#B83E2C',
        },
      },
      fontFamily: {
        serif: ['"Be Vietnam Pro"', '"Cinzel"', '"Merriweather"', 'system-ui', 'serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['"Be Vietnam Pro"', '"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
        '19': 'repeat(19, minmax(0, 1fr))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(87, 200, 200, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(87, 200, 200, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
