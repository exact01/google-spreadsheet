import * as dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({ path: path.join(__dirname, '../../../', '.env') })
export const {
    JWT_SECRET_KEY,
    SERVER_PORT,
    NODE_ENV,
    DOMAIN,
    CLIENT_URL,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_IP_ADDRESS,
    SALT,
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY,
    GOOGLE_SHEET_ID,
} = process.env

export const origin: string[] = [`http://${DOMAIN}`, `https://${DOMAIN}`, CLIENT_URL]

export const corsOptions = {
    origin: origin,
    credentials: true,
    optionSuccessStatus: 200,
}