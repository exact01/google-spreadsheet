declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_SECRET_KEY: string
            SERVER_PORT: string
            NODE_ENV: 'development' | 'production' | 'test'
            DOMAIN: string
            CLIENT_URL: string
            POSTGRES_USER: string,
            POSTGRES_PASSWORD: string,
            POSTGRES_DB: string,
            POSTGRES_PORT: string,
            POSTGRES_IP_ADDRESS: string,
            SALT: string
            GOOGLE_SERVICE_ACCOUNT_EMAIL: string
            GOOGLE_PRIVATE_KEY: string
            GOOGLE_SHEET_ID: string
        }
    }
}

export {}