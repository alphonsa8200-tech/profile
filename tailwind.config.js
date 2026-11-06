/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          DEFAULT: '#5E48E8',
          hover: '#4D37D6',
          dark: '#3D28B5',
        },
        cardPastel: {
          purple: '#EDE9FE',
          yellow: '#FEF9C3',
          yellowLight: '#FFFDE7',
          mint: '#DCFCE7',
          peach: '#FFEDD5',
          blue: '#E0F2FE',
        },
        surface: {
          canvas: '#F8F7FC',
          card: '#FFFFFF',
          border: '#E8E5F2',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(94, 72, 232, 0.06)',
        'soft-hover': '0 16px 36px rgba(94, 72, 232, 0.12)',
        'card': '0 4px 20px -2px rgba(28, 25, 57, 0.05)',
      }
    },
  },
  plugins: [],
};
