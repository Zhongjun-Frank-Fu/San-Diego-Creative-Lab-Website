import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // GitHub Pages: change to your repo name, e.g. '/BUILD_SD-Website/'
  // Use '/' if deploying to username.github.io root
  base: '/San-Diego-Creative-Lab-Website/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
