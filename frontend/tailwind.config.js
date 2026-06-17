/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A',
        bg: '#0A0A0A',
        surface: '#121212',
        card: '#1A1A1A',
        muted: '#9CA3AF',
        primary: {
          DEFAULT: '#D4AF37',
          hover: '#F3E5AB',
          contrastText: '#000000',
        },
        accent: {
          DEFAULT: '#F59E0B',
        },
        success: {
          DEFAULT: '#10B981',
        },
        danger: {
          DEFAULT: '#EF4444',
        },
        text: {
          primary: '#F8FAFC',
          muted: '#9CA3AF',
        },
        border: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
        'soft-lg': '0 20px 40px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
