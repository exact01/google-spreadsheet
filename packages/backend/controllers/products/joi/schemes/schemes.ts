import { Joi } from 'celebrate'
export interface IProductsProvider{
    ids: number[]
}

const idsSchema = Joi.array().items(Joi.number()).required()

export const bodyProductsProvider = Joi.object<IProductsProvider>({
    ids: idsSchema,
})

