import { logout, signIn, signUp } from '@/controllers/auth'
import { Router } from 'express'
import { signupCelebrate } from '@/controllers/auth/joi/signup'
import { signInCelebrate } from '@/controllers/auth/joi/signin'
import { limiterAuth } from '@/configs/rateLimites'

const router = Router()

router.post(
    '/auth/sign-in',
    limiterAuth,
    signInCelebrate,
    signIn
)
router.post(
    '/auth/sign-up',
    limiterAuth,
    signupCelebrate,
    signUp
)

router.get(
    '/auth/logout',
    limiterAuth,
    signupCelebrate,
    logout
)


export {
    router as authorizeRouter
}