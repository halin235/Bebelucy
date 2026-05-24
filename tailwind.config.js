/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bebelucy: {
          blue: '#31A0FF',
          'blue-dark': '#0095F6',
          'blue-deep': '#1E88E5',
          tint: '#E8F4FF',
          'tint-soft': '#F4F9FF',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 2px 16px -4px rgba(49, 160, 255, 0.08), 0 8px 24px -8px rgba(30, 41, 59, 0.06)',
        float: '0 12px 40px -12px rgba(49, 160, 255, 0.18)',
      },
    },
  },
  plugins: [],
}
