import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: '#00CFCF',
        yellow: {
          300: '#F2D533',
          400: '#E4C700',
        },
      },
    },
  },
  plugins: [],
};

export default config;
