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
      'primary': '#be4242',
      'primary-light': '#b9638b',
      'secondary': '#137e84',
      'white': "#fff",

      'gray': {
        900: '#444',
        800: '#767676',
      }
    }
  },
  plugins: [require("@tailwindcss/forms")],
};
