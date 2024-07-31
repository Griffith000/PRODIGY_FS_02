import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import dotenv from 'dotenv';
dotenv.config();


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),nodePolyfills()],
  proxy: {
    '/api': {
      target:'https://localhost:3000',
      changeOrigin: true,
      secure: false,
    },
  },
  
})
