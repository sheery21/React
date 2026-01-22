import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',  // ye humara main color theme
        secondary: '#6366F1',
        accent: '#818CF8',
      },
    },
  },
})
