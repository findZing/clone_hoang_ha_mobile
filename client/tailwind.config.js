/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        window: '#f4f4f4',
        primary: '#00483D',
        'window-dashboard': '#ebedef',
        'full-gray': '#E5E5E5',
        'tab-index': '#3c4b64',
        'hover-tab-index': '#46546c',
        'header-tab-index': '#303c54',
        'contain-modal': 'rgb(89, 89, 89, 0.3)',
        'prompt': '#f7941e',
        orange: '#FF6801',
        'btn-content': 'transparent linear-gradient(90deg,#009981 0%,#00483d 100%) 0% 0% no-repeat',


      },
      dropShadow: {
        primary: '0 4px 6px #ccc',
      },
      textColor: {
        price: '#fd475a',
        second: '#00483D',
        prompt: '#f7941e'
      },
      maxWidth: {
        window: '1200px'
      }
    },
  },
  plugins: [],
}