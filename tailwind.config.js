/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      primary: 'var(--color-primary)',
      neutral: 'var(--color-neutral)',
      text: 'var(--color-text)',
      bg: 'var(--color-bg)',
      'bg-neutral': 'var(--color-bg-neutral)',
      'bg-soft': 'var(--color-bg-soft)',
      border: 'var(--color-border)',
      'dark-primary': 'var(--color-dark-primary)',
      'dark-neutral': 'var(--color-dark-neutral)',
      'dark-text': 'var(--color-dark-text)',
      'dark-bg': 'var(--color-dark-bg-neutral)',
      'dark-bg-neutral': 'var(--color-dark-bg-neutral)',
      'dark-bg-soft': 'var(--color-dark-bg-soft)',
      'dark-border': 'var(--color-dark-border)',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
