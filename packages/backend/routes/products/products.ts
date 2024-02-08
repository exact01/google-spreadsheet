import { Router } from 'express'
import { limiter } from '@/configs/rateLimites'
import { getCountProductsFromProviders, getProducts } from '@/controllers/products'
import { productsProviderCelebrate } from '@/controllers/products/joi/productsProvider'
import { isAuthorized } from '@/middlewares/isAuthorized'

const router = Router()

router.get(
    '/products',
    limiter,
    isAuthorized,
    getProducts
)

router.post(
    '/products/provider',
    limiter,
    isAuthorized,
    productsProviderCelebrate,
    getCountProductsFromProviders
)

export {
    router as productsRouter
}