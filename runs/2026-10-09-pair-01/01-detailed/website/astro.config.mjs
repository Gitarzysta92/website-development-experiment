import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
export default defineConfig({ output: 'static', adapter: node({ mode: 'standalone' }), outDir: './.dist-candidate/', site: process.env.SITE_ORIGIN || 'http://127.0.0.1:4321', trailingSlash: 'ignore', devToolbar: { enabled: false }, build: { inlineStylesheets: 'never' }, vite: { build: { sourcemap: false, assetsInlineLimit: 0 } } });
