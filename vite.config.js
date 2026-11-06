import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['sb-7f9tv2kfm6f1.vercel.run'],
  },
  preview: {
    allowedHosts: ['sb-7f9tv2kfm6f1.vercel.run'],
  },
})
