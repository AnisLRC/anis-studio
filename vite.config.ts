import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Omogućava pristup s drugih uređaja u lokalnoj mreži
    port: 5173, // Port (možete promijeniti ako je zauzet)
    strictPort: false, // Ako je port zauzet, probaj sljedeći
  },
  preview: {
    host: true, // Omogućava pristup s drugih uređaja i za preview
    port: 4173,
  }
})

