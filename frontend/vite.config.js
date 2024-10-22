import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Explicitly set the output directory
  },
  server: {
    proxy: {
      '/api': {
        target: import.meta.env.VITE_BACKEND_URL, // Replace with your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});