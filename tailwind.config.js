/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: colors.red,
                primaryDark: '#1d1d1d',
                secondaryDark: '#161b22',
            },
            boxShadow: {
                '3xl': 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
            },
        },
        screens: {
            xs: '480px',
            ss: '640px',
            sm: '768px',
            md: '1024px',
            lg: '1280px',
            xl: '1536px',
        },
        fontFamily: {
            timeNewRoman: ['Times New Roman', 'serif'],
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
