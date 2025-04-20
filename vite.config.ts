import { defineConfig } from 'vite'
import path from "path"
// @ts-ignore
import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 1111,
    allowedHosts: ['.ngrok-free.app']
  }
})
