import jwt from 'jsonwebtoken'
import {
    JWT_SECRET_KEY
} from '@/utils/constants'

import { IAccessToken, IJwtUser } from './interfeces'
export class JwtService {

    async generateAccessToken(payload: { id: string }): Promise<IAccessToken>{
        const accessToken = jwt.sign(payload, JWT_SECRET_KEY)
        return {
            accessToken,
        }
    }

    async validateAccessToken(token: string){
        try {
            return <IJwtUser>jwt.verify(token, JWT_SECRET_KEY, { ignoreExpiration: true })
        } catch (e){
            return null
        }
    }
}

export const jwtService = new JwtService()