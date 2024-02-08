import { request } from '@/api/request'
import { AxiosResponse } from 'axios'
import { IPostProductsProvider, IProducts } from '@/api/products/products.models'
export default {
    getProducts() {
        return request<AxiosResponse<IProducts[]>>({
            url: __SERVER_URL__ + '/products',
            method: 'GET',
        })
    },
    getProductsProvider(data: IPostProductsProvider) {
        return request<AxiosResponse<IProducts[]>>({
            url: __SERVER_URL__ + '/products/provider',
            method: 'POST',
            data,
        })
    },
}
