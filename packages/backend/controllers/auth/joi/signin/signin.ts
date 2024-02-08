import { celebrate } from 'celebrate'
import type { RequestHandler } from 'express'
import { bodySignIn } from '../schemes'


export const signInCelebrate: RequestHandler = celebrate({
    body: bodySignIn,
})