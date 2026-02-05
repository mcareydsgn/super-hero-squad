// @ts-check
import { defineConfig, envField } from 'astro/config';
import react from '@astrojs/react';


import cloudflare from '@astrojs/cloudflare';


export default defineConfig({
    output: 'server',
    build: {
        assets: 'assets',
    },
    integrations: [react()],
    adapter: cloudflare(),
    env: {
        schema: {
            API_KEY: envField.string({
                context: 'server',
                access: 'secret'
            }),
        },
    },
});