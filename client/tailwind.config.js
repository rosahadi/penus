/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        primaryLight: 'var(--primary-light)',
        primaryDark: 'var(--primary-dark)',

        bgMain: 'var(--bg-main)',
        bgCard: 'var(--bg-card)',
        bgSecondary: 'var(--bg-secondary)',
        bgTertiary: 'var(--bg-tertiary)',

        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',
        textTertiary: 'var(--text-tertiary)',
        textOnPrimary: 'var(--text-on-primary)',

        inputBg: 'var(--input-bg)',
        inputBorder: 'var(--input-border)',
        inputFocus: 'var(--input-focus)',
        inputPlaceholder: 'var(--input-placeholder)',

        buttonPrimary: 'var(--button-primary)',
        buttonHover: 'var(--button-hover)',
        buttonPressed: 'var(--button-pressed)',
        buttonDisabled: 'var(--button-disabled)',

        success: 'var(--success)',
        error: 'var(--error)',
        warning: 'var(--warning)',
        info: 'var(--info)',

        borderLight: 'var(--border-light)',
        borderMedium: 'var(--border-medium)',
        borderDark: 'var(--border-dark)',

        shadowLight: 'var(--shadow-light)',
        shadowMedium: 'var(--shadow-medium)',
        shadowDark: 'var(--shadow-dark)',

        overlayLight: 'var(--overlay-light)',
        overlayMedium: 'var(--overlay-medium)',
        overlayDark: 'var(--overlay-dark)',
      },
    },
  },
  plugins: [],
};
