import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: /noam-omer-wedding/  |  Vercel & local dev: /
const base = process.env.VERCEL ? '/' : '/noam-omer-wedding/'

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})