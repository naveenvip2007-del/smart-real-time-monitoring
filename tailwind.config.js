/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0A1E3F',
          blue: '#1E3A8A',
          azure: '#2563EB',
          sky: '#38BDF8',
          gold: '#D97706',
          saffron: '#EA580C',
          green: '#15803D',
          emerald: '#059669',
          light: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          darkBorder: '#1E293B',
          textMuted: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        gov: '0 4px 20px -2px rgba(10, 30, 63, 0.08), 0 2px 6px -1px rgba(10, 30, 63, 0.04)',
        'gov-lg': '0 10px 30px -4px rgba(10, 30, 63, 0.12), 0 4px 10px -2px rgba(10, 30, 63, 0.06)',
      }
    },
  },
  plugins: [],
}
