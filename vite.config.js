import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['sb-5j51hu4wxgpk.vercel.run'],
  },
  preview: {
    allowedHosts: ['sb-5j51hu4wxgpk.vercel.run'],
  },
})
