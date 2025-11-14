import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import vuetify from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
  },

  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    vuetify({ autoImport: true }),

    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: [
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png'
      ],

      manifest: {
        name: 'GoRoutes',
        short_name: 'GoRoutes',
        description: 'Aplicativo para gerenciamento de rotas',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',

        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },

      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024
      }
    })
  ],

  optimizeDeps: {
    include: ['fast-deep-equal']
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
