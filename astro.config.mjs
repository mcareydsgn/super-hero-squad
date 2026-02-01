// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node'; // 1. Import the adapter

export default defineConfig({
    build: {
        assets: 'assets',
    },
    adapter: node({
        mode: 'standalone',
    }),
    integrations: [react()]
});