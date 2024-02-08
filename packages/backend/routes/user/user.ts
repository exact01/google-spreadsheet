import { Router } from 'express'
import { isAuthorized } from '@/middlewares/isAuthorized'
import { getUserMe } from '@/controllers/user'
import { limiter } from '@/configs/rateLimites'

const router = Router()

router.get(
    '/users/me',
    isAuthorized,
    limiter,
    getUserMe
)

export {
    router as userRouter
}