import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base public path
  base: '/',

  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    
    // Multi-page configuration
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        blog: resolve(__dirname, 'blog/index.html'),
      },
    },
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console.logs in production
      },
    },
  },

  // Development server
  server: {
    port: 5173,
    host: true,
    open: true,
    
    // Proxy for future API integration
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'https://api.bridgitsocial.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Preview server (for production build testing)
  preview: {
    port: 4173,
    host: true,
  },

  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@assets': resolve(__dirname, 'assets'),
      '@components': resolve(__dirname, 'src/components'),
      '@api': resolve(__dirname, 'src/api'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },

  // CSS configuration
  css: {
    devSourcemap: true,
  },

  // Plugin configuration (add as needed)
  plugins: [],
});
