module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.{html,js}',
    './src/**/*.{html,js,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      'default': ['SF Pro Display', 'sans-serif']
    },
    fontWeight: {
      'normal': 400,
      'medium': 500,
      'semibold': 700 
    },
    colors: {
      'primary': '#0075A0',
      'primary-light': '#009BD4',
      'secondary': '#1C2A2F',

      'white': "#fff",
      'red': '#ff0000',
      
      'dark': {
        900: '#131313',
        800: '#111111',
        700: '#161616'
      },

      'gray': {
        900: '#444',
        800: '#767676',
      }
    }
  },
  plugins: [require("@tailwindcss/forms")],
};
