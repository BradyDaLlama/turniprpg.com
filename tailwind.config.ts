import { heroui } from "@heroui/react";

const colors = {
    primary: {
        DEFAULT: '#ffe7c4',
        foreground: '#121215',
    },
    primaryDark: {
        DEFAULT: '#ff9d71',
        foreground: '#121215',
    },
    secondary: {
        DEFAULT: '#63a9ff',
        foreground: '#121215',
    },
    secondaryDark: {
        DEFAULT: '#5865f2',
        foreground: '#121215',
    },
};

module.exports = colors;

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
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
        heroui({
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
