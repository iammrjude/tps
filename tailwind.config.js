/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      space: '#18042c',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      teal: colors.teal,
      indigo: colors.indigo,
      blue: colors.blue,
      green: colors.green,
      red: colors.rose,
      yellow: colors.amber,
      stone: colors.stone,
      neutral: colors.neutral,
      gray: colors.gray,
      zinc: colors.zinc,
      slate: colors.slate,
    },
  },
  plugins: [],
}
