/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
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
            }
        },
    },
    plugins: [],
};
