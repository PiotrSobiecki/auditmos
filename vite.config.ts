import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const basePath = process.env.VITE_PUBLIC_BASE_PATH ?? '/'

export default defineConfig({
  base: basePath,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
