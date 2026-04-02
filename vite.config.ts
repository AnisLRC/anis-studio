import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'analyze' &&
      visualizer({
        filename: 'dist/stats.html',
        gzipSize: true,
        open: false,
      }),
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-framer'
            if (id.includes('@supabase')) return 'vendor-supabase'
          }
        },
      },
    },
  },
  server: {
    host: true, // Omogućava pristup s drugih uređaja u lokalnoj mreži
    port: 5173, // Port (možete promijeniti ako je zauzet)
    strictPort: false, // Ako je port zauzet, probaj sljedeći
  },
  preview: {
    host: true, // Omogućava pristup s drugih uređaja i za preview
    port: 4173,
  },
}))
