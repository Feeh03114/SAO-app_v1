/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'Inter': ['Inter', 'sans-serif'],
            },
            screens: {
                'sm-mobile': '280px', 
                'md-mobile': '391px',
                'lg-mobile': '415px',
                'xl-mobile': '540px',
                'tablet': '1050px'
            },
            backgroundImage: {
                'gradient-96': 'linear-gradient(96deg, var(--tw-gradient-stops))'
            },
        },
    },
    plugins: [
        require('flowbite/plugin'),
        require('flowbite-typography'),
    ],
    darkMode: "class",
}