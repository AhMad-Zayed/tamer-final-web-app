/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        background: '#131313',
        surface: '#131313',
        'surface-container-low': '#1c1b1b',
        'surface-container-highest': '#353535',
        primary: {
          DEFAULT: '#ffffff',
          neon: '#c3f400', // Electric Lime
        },
        secondary: {
          DEFAULT: '#e9c349', // Luxury Gold
        },
        tertiary: '#f4bb92', // Wood Tones
        outline: {
          variant: 'rgba(68, 73, 51, 0.15)', // Ghost Border
        }
      },
      fontFamily: {
        display: ['Epilogue', 'sans-serif'], // Editorial Authority
        sans: ['Manrope', 'sans-serif'],    // Clinical Precision
        mono: ['Inter', 'sans-serif'],      // Technical Labels
      },
      borderRadius: {
        'xl': '0.75rem',
        'lg': '0.5rem',
      },
      boxShadow: {
        'neon-glow': '0 0 15px rgba(195, 244, 0, 0.4)', // Neon Sanctuary Glow
      }
    },
  },

}