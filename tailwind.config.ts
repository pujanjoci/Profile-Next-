import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        // Add the grid pattern
        'grid-slate-200': 'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
      },
      backgroundSize: {
        // Set the size of the grid squares
        'grid-slate-200': '40px 40px',
      },
    },
  },
  plugins: [],
} satisfies Config