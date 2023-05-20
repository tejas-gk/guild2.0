/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
    darkMode:'class',
    content: ['./src/**/*.{js,ts,jsx,tsx,stories.tsx}'],
    theme: {
        extend: {
            backgroundColor: {
                'dark-body': '#111827',
              },
            color:{
                'dark-elements-color':'#1f2937'
               },
               spacing: {
                '32': '8rem',
                '40': '18rem',
              },
        },
    },
    plugins: [],
};
