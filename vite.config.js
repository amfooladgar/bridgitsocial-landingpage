import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base public path
  base: '/',

  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,  // Disable sourcemaps for production
    
    // Multi-page configuration - include ALL HTML pages
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        instructions: resolve(__dirname, 'instructions.html'),
        waitlist: resolve(__dirname, 'waitListPage.html'),
        blog: resolve(__dirname, 'blog/index.html'),
        support: resolve(__dirname, 'support/support.html'),
        blogPost1: resolve(__dirname, 'blog/posts/welcome-to-bridgit-blog.html'),
        blogPost2: resolve(__dirname, 'blog/posts/networking-tips-2025.html'),
      },
    },
    
    // Use esbuild instead of terser (faster and built-in)
    minify: 'esbuild',
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

  // Copy additional static files
  publicDir: 'public',  // Vite won't use this by default since we have assets
  
  // Ensure these directories are copied
  // Note: Vite automatically copies 'public' dir, but we need custom handling
  build: {
    copyPublicDir: false,  // We'll handle copying manually in the build
  },

  // Plugin configuration (add as needed)
  plugins: [],
});
