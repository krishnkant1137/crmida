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
        target: 'http://3.145.137.229:5000', // Replace with your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});