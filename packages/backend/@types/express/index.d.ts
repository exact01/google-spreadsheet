import { IJwtUser } from '@/service/jwt/interfeces'

declare global {
    namespace Express {
        interface Request {
            myUser: IJwtUser
        }
        interface Response {
            userId: number
        }
    }
}


export {}