/// <reference types="vite/client" />

declare module 'virtual:pwa-register' {
    // Экспортируйте типы, которые вы ожидаете использовать
    export function registerSW(options?: {
        immediate?: boolean;
        onNeedRefresh?: () => void;
        onOfflineReady?: () => void;
    }): void;
}