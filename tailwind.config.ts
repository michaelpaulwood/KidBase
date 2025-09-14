import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // KidBase Design System
      colors: {
        primary: {
          50: '#fef7ed',
          100: '#fdedd3', 
          200: '#fbd7a5',
          300: '#f8bb6d',
          400: '#f59532',
          500: '#f27a0a',
          600: '#e35d05',
          700: '#bc4508',
          800: '#95370e',
          900: '#7a2f0f',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        warm: {
          50: '#fefdf8',
          100: '#fef7e7',
          200: '#feebc8',
          300: '#fbd38d',
          400: '#f6ad55',
          500: '#ed8936',
          600: '#dd6b20',
          700: '#c05621',
          800: '#9c4221',
          900: '#7b341e',
        },
      },
      backgroundImage: {
        'core-gradient': 'linear-gradient(180deg, #fef7ed 0%, #ffffff 20%, #ffffff 80%, #fef7ed 100%)',
        'warm-gradient': 'linear-gradient(180deg, #ffffff 0%, #fef7ed 20%, #feebc8 50%, #fef7ed 80%, #ffffff 100%)',
        'cool-gradient': 'linear-gradient(180deg, #ffffff 0%, #f0f9ff 20%, #e0f2fe 50%, #f0f9ff 80%, #ffffff 100%)',
        'hero-gradient': 'linear-gradient(135deg, #fef7ed 0%, #ffffff 30%, #f0f9ff 70%, #feebc8 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 8vw, 5rem)', { lineHeight: '1.1', fontWeight: '900' }],
        'display': ['clamp(2rem, 6vw, 3.5rem)', { lineHeight: '1.2', fontWeight: '800' }],
        'heading': ['clamp(1.5rem, 4vw, 2.5rem)', { lineHeight: '1.3', fontWeight: '700' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'core': '1.5rem',
        'card': '1rem',
      },
      boxShadow: {
        'core': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'core-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
export default config;