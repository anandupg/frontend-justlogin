import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Login Cookies App',
      short_name: 'LoginApp',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#213547',
      icons: [
        {
          src: '/vite.svg',
          sizes: '192x192',
          type: 'image/svg+xml',
        },
        {
          src: '/vite.svg',
          sizes: '512x512',
          type: 'image/svg+xml',
        },
      ],
    },
  })],
})
