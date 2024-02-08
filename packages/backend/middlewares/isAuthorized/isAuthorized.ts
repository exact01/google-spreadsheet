import type { NextFunction, Request, Response } from 'express'
import { AUTH_ERRORS, AuthError } from '@/errors/AuthError'
import { jwtService } from '@/service/jwt'

async function isAuthorized(req: Request, _res: Response, next: NextFunction) {
    try {
        const { accessToken }: { accessToken: string | null } = req.cookies
        if (!accessToken){
            next(new AuthError('Authorization required'))
        } else {
            const userData = await jwtService.validateAccessToken(accessToken)
            if (userData) {
                req.myUser = userData
                next()
            } else {
                next(new AuthError(AUTH_ERRORS.AUTH_REQUIRED))
            }
        }
    } catch (e){
        next(new AuthError(AUTH_ERRORS.AUTH_REQUIRED))
    }
}

export {
    isAuthorized
}