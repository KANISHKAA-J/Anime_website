/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#040508',
        surface: '#0d0f17',
        primary: '#00f2fe',
        primaryHover: '#00c6ff',
        accent: '#ff007f',
        accentHover: '#e00070',
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 5px rgba(0, 242, 254, 0.3))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(0, 242, 254, 0.6))' },
        }
      }
    },
  },
  plugins: [],
}
