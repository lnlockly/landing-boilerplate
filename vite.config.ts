import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from 'vite-plugin-sitemap';
import path from 'node:path';
import { seoInjectPlugin } from './src/build/seo-inject-plugin';

// Hostname is overridden via env at build time (platform injects PREVIEW_URL)
const hostname = process.env.SITE_URL || 'https://example.com';

export default defineConfig({
  plugins: [
    // Rewrites <title> / meta description / og:* in index.html from
    // src/config/landing.config.ts BEFORE Vite emits the bundle. Without
    // this, crawlers + social link-previews see boilerplate copy because
    // React only fills the body, never the static <head>.
    seoInjectPlugin(),
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
