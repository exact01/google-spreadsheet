import type { NextFunction, Request, Response } from 'express'
import { productsService } from '@/service/products/products.service'
import { IProductsProvider } from '@/controllers/products/joi/schemes/schemes'
async function getProducts(_req: Request, res: Response, next: NextFunction) {
    try {
        res.send(await productsService.getByProducts())
    } catch (e){
        next(e)
    }
}

async function getCountProductsFromProviders(req: Request, res: Response, next: NextFunction) {
    try {
        const body: IProductsProvider = req.body
        res.send(await productsService.getFakeCount(body.ids))
    } catch (e){
        next(e)
    }
}

export {
    getProducts,
    getCountProductsFromProviders
}