import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        mint: {
          DEFAULT: '#F0FDF4',
          50: '#FAFFFB',
          100: '#F0FDF4',
          200: '#DCFCE7',
          300: '#BBF7D0',
          400: '#86EFAC',
        },
        forest: {
          DEFAULT: '#15803D',
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          950: '#052E16',
        },
        bloom: {
          DEFAULT: '#EC4899',
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        },
        ink: {
          DEFAULT: '#14532D',
          50: '#F0FDF4',
          500: '#14532D',
          700: '#0B3D20',
          900: '#052E16',
        },
        glass: {
          DEFAULT: 'rgba(255,255,255,0.55)',
          hi: 'rgba(255,255,255,0.75)',
          lo: 'rgba(255,255,255,0.35)',
          edge: 'rgba(255,255,255,0.6)',
        },
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
        'blob': '63% 37% 54% 46% / 55% 48% 52% 45%',
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(20, 83, 45, 0.08), 0 4px 24px -4px rgba(20, 83, 45, 0.06)',
        'lift': '0 12px 40px -10px rgba(20, 83, 45, 0.22), 0 24px 80px -24px rgba(20, 83, 45, 0.14)',
        'glass': '0 1px 0 0 rgba(255,255,255,0.7) inset, 0 20px 50px -20px rgba(20, 83, 45, 0.18)',
        'bloom': '0 0 0 1px rgba(236, 72, 153, 0.12), 0 25px 60px -20px rgba(236, 72, 153, 0.35)',
        'forest-glow': '0 0 0 1px rgba(21, 128, 61, 0.12), 0 25px 60px -20px rgba(34, 197, 94, 0.35)',
      },
      backgroundImage: {
        'cta-mesh':
          'radial-gradient(at 20% 20%, #15803D 0%, transparent 55%), radial-gradient(at 80% 30%, #EC4899 0%, transparent 45%), radial-gradient(at 60% 80%, #22C55E 0%, transparent 50%), linear-gradient(135deg, #052E16 0%, #14532D 60%, #166534 100%)',
        'hero-mesh':
          'radial-gradient(60% 50% at 50% 0%, rgba(187, 247, 208, 0.85) 0%, rgba(240, 253, 244, 0) 65%), radial-gradient(40% 50% at 10% 80%, rgba(249, 168, 212, 0.45) 0%, rgba(240, 253, 244, 0) 70%), radial-gradient(50% 60% at 95% 40%, rgba(74, 222, 128, 0.35) 0%, rgba(240, 253, 244, 0) 70%)',
        'grain':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.08 0 0 0 0 0.33 0 0 0 0 0.18 0 0 0 0.22 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'scroll-x': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(4deg)' },
        },
        'float-lg': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-26px) translateX(10px) rotate(6deg)' },
          '66%': { transform: 'translateY(-12px) translateX(-8px) rotate(-5deg)' },
        },
        'blob-morph': {
          '0%, 100%': { borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%' },
          '33%': { borderRadius: '37% 63% 42% 58% / 48% 62% 38% 52%' },
          '66%': { borderRadius: '52% 48% 67% 33% / 42% 55% 45% 58%' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'marquee': 'scroll-x 45s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-lg': 'float-lg 11s ease-in-out infinite',
        'blob': 'blob-morph 14s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 20s ease infinite',
        'shimmer': 'shimmer 2.4s linear infinite',
      },
      transitionTimingFunction: {
        'elastic': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'liquid': 'cubic-bezier(0.65, 0.05, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
