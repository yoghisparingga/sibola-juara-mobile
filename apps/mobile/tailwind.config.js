/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF3FF',
          100: '#D9E3FF',
          200: '#B4C8FF',
          300: '#83A4FF',
          400: '#5079FF',
          500: '#2B5CFF',
          600: '#1E5BF5',
          700: '#1948C9',
          800: '#16399B',
          900: '#11296F',
        },
        ink: {
          900: '#0B1220',
          700: '#1F2937',
          500: '#4B5563',
          400: '#6B7280',
          300: '#9CA3AF',
          200: '#D1D5DB',
          100: '#E5E7EB',
          50: '#F3F4F6',
        },
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626',
        surface: '#FFFFFF',
        background: '#F5F7FB',
      },
      fontFamily: {
        sans: ['System'],
      },
      borderRadius: {
        xl2: '20px',
      },
    },
  },
  plugins: [],
};
