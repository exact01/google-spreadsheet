import { celebrate } from 'celebrate'
import type { RequestHandler } from 'express'
import { bodySignUp } from '../schemes'

export const signupCelebrate: RequestHandler = celebrate({
    body: bodySignUp,
})