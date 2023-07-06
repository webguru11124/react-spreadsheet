/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        colors: {
            ...colors,
            transparent: 'transparent',
            current: 'currentColor',
            'primary': '#EFEFEF',
            'secondary': '#FAFAFA',
            'danger': "#AF3434",
            "danger-light": "#FFEFEF",
        },
        extend: {
            boxShadow: {
                'DEFAULT': '1px 1px 10px 1px rgba(0, 0, 0, 0.3)',
            },
            spacing: {
                '200': '200px',
            }
        },
    },
    plugins: [],
}       