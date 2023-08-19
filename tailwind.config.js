/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    darkMode: 'class',
    content: ['./src/**/*.{js,ts,jsx,tsx,stories.tsx}'],
    theme: {
        extend: {
            colors:{
                'debug-red': '#ff0000',
                'debug-blue': '#0000ff',
                'debug-emerald': '#00ff00',
                'debug-orange': '#ff7f00',
                'debug-purple': '#7f00ff',
                'debug-pink': '#ff00ff',

                'primary': 'hsl(238, 40%, 52%)',
                'primary-light': 'hsl(238, 40%, 62%)',
                'primary-dark': 'hsl(238, 40%, 42%)',
                'primary-contrast': 'hsl(238, 40%, 92%)',
                'background': 'hsl(228, 33%, 97%)',
            },
            aspectRatio: {
                '13/9': '13/9',
            },
        },
    },
    plugins: [],
};
