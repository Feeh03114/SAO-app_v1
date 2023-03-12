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
                'sm-mobile': '281px', 
                'md-mobile': '391px',
                'lg-mobile': '415px',
                'xl-mobile': '540px',
                'tablet': '1050px'
            },
            colors: {
                'teal-sao': {
                    1: '#F7FEFE',
                    2: '#EAFAFB',
                    3: '#D9EEEF',
                    4: '#ACDCDC',
                    5: '#67C9CB',
                    6: '#0DA2A5',
                    7: '#03888F',
                    8: '#006C72',
                    9: '#005C61',
                    10: '#005055',
                    11: '#00474A',
                    12: '#003D40',
                    13: '#003133',
                },
                'gray-sao': {
                    1: '#F5F5F5',
                    2: '#F0F0F0',
                    3: '#E0E0E0',
                    4: '#CCCCCC',
                    5: '#B8B8B8',
                    6: '#A3A3A3',
                    7: '#8F8F8F',
                    8: '#7A7A7A',
                    9: '#666666',
                    10: '#525252',
                    11: '#3D3D3D',
                    12: '#292929',
                    13: '#141414',
                },
            },
        },
    },
    plugins: [
        require('flowbite/plugin'),
        require('flowbite-typography'),
    ],
}