module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{html,js}',
    './src/**/*.{html,js,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      'default': ['Inter', 'Roboto', 'sans-serif'],
      'twk': ['TWKEverett', 'Roboto', 'sans-serif'],
    },
    fontWeight: {
      'normal': 400,
      'medium': 500,
      'semibold': 700,
      'bold': 900 
    },
    colors: {
      'primary': '#0075A0',
      'primary-light': '#009BD4',
      'secondary': '#1C2A2F',

      'white': "#fff",
      'red': '#ff0000',
      
      'dark': {
        900: '#040404',
        800: '#141414',
        700: '#343434'
      },

      'gray': {
        900: '#999999',
        800: '#767676',
      }
    },
    extend: {
      keyframes: {
        'item-swipe-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(120px)' },
        },
        'item-swipe-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-120px)' },
        }
      }
    }
  },
  plugins: [require("@tailwindcss/forms")],
};
