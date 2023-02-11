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
        },
    },
    plugins: [
        require('flowbite/plugin'),
        require('flowbite-typography'),
    ],
}