/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
          fontFamily: {
              'poppins': ['Poppins'],
          },
          screens: {
              'sm-mobile': '280px', 
              'md-mobile': '391px',
              'lg-mobile': '415px',
              'xl-mobile': '540px',
              'tablet': '1050px'
          },
      },
  },
  plugins: [
      require('flowbite/plugin'),
      require('flowbite-typography'),
  ],
}