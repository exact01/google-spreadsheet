import { Router } from 'express'
import { authorizeRouter } from './auth'
import { userRouter } from './user'
import { productsRouter } from './products'

const router = Router()

router.use(authorizeRouter)
router.use(userRouter)
router.use(productsRouter)

export {
    router as indexRouters
}