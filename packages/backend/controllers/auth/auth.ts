import type { NextFunction, Request, Response } from 'express'
import { authService } from '@/service/auth'
import { clearCookie, setCookie } from '@/utils/helpers/cookieToken'
import { ISignInSchema, ISignUpSchema } from '@/controllers/auth/joi/schemes/schemes'

async function signIn(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password }: ISignInSchema = req.body
        const tokens = await authService.signIn({ email, password })
        await setCookie(res, tokens)
        res.status(200).send({ isLoggedIn: true })
    } catch (e) {
        next(e)
    }
}

async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password }: ISignUpSchema = req.body
        const tokens = await authService.signUp({ email, password })
        await setCookie(res, tokens)
        res.status(201).send({ isLoggedIn: true })
    } catch (e) {
        next(e)
    }
}

async function logout(_req: Request, res: Response, next: NextFunction){
    try {
        await clearCookie(res)
        res.status(200).send({ isLoggedIn: false })
    } catch (e) {
        next(e)
    }
}


export {
    signUp,
    signIn,
    logout
}
