import { nextui } from '@nextui-org/react';

const colors = {
    primary: {
        DEFAULT: '#5865f2',
        foreground: '#fff',
    },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-sans)'],
                mono: ['var(--font-geist-mono)'],
            },
        },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            themes: {
                dark: {
                    colors: colors,
                },
                light: {
                    colors: colors,
                },
            },
        }),
    ],
};
