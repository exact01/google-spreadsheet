import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'
import * as dotenv from 'dotenv'
import { VitePWA } from 'vite-plugin-pwa'
import { viteStaticCopy } from 'vite-plugin-static-copy'

dotenv.config({ path: path.join(__dirname, '../../', '.env') })
// https://vitejs.dev/config/

export default defineConfig({
    server: {
        port: 3000,
        cors: false,
    },
    assetsInclude: ['**/*.png'],
    define: {
        __SERVER_URL__: JSON.stringify(process.env.SERVER_URL).trim(),
        __NODE_ENV__: JSON.stringify(process.env.NODE_ENV).trim(),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
        },
    },
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/assets/pwa/*',
                    dest: 'assets',
                },
            ],
        }),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['**/*.{js,css,html,ico,jpg,png,svg,webmanifest}'],
            workbox: {
                clientsClaim: true,
                skipWaiting: true,
                cleanupOutdatedCaches: true,
                navigateFallback: null,
                globPatterns: ['**/*.{js,css,html,ico,jpg,png,svg,webmanifest}'],
            },
            includeManifestIcons: false,
            manifest: {
                name: 'btlz',
                short_name: 'btlz',
                description: 'Your bots, your store',
                theme_color: '#1a1818',
                icons: [
                    {
                        src: './assets/android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: './assets/android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            devOptions: {
                enabled: true,
                type: 'module',
                navigateFallback: 'index.html',
                suppressWarnings: true,
            },
        }),
    ],
})