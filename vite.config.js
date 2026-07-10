import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Break bundling monoliths down to highly-cacheable progressive ES modules
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react')) {
              return 'vendor-react';
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons';
            }
            return 'vendor-others';
          }
        }
      }
    }
  },
  esbuild: {
    // Automatically strip dev-only debugger states and console warnings from production builds
    drop: ['console', 'debugger'],
  }
})