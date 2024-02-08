import { celebrate } from 'celebrate'
import type { RequestHandler } from 'express'
import { bodyProductsProvider } from '../schemes'

export const productsProviderCelebrate: RequestHandler = celebrate({
    body: bodyProductsProvider,
})