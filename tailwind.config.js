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
                primaryDark: '#081229',
                secondaryDark: '#191d3a',
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
            lora: ['Lora', 'serif'],
            timeNewRoman: ['Times New Roman', 'serif'],
        },
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
