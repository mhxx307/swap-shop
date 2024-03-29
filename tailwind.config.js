const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: colors.fuchsia,
                secondary: '#5142fc',
                primaryDark: '#14141f',
                secondaryDark: '#1e1e1e',
            },
            boxShadow: {
                '3xl': 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
                headerDark: '2px 2px 4px -2px #e250e5',
                headerLight: '2px 2px 4px -2px #919eab',
                itemCardLight: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                itemCardDark: '#e250e5 0px 1px 4px',
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
    plugins: [
        plugin(function ({ addComponents, theme }) {
            addComponents({
                '.container': {
                    maxWidth: theme('columns.7xl'),
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: theme('spacing.4'),
                    paddingRight: theme('spacing.4'),
                },
                '.flex-center': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                '.header-height': {
                    paddingTop: '160px',
                },
            });
        }),
        require('@tailwindcss/line-clamp'),
    ],
};
