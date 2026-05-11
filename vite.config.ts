import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from 'vite-plugin-sitemap';
import path from 'node:path';

// Hostname is overridden via env at build time (platform injects PREVIEW_URL)
const hostname = process.env.SITE_URL || 'https://example.com';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname,
      dynamicRoutes: ['/'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2022',
    cssMinify: 'lightningcss',
  },
});
