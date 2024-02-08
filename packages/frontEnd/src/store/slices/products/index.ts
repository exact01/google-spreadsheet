import api from '@/api'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPostProductsProvider, IProducts } from '@/api/products/products.models'
import { Id, toast } from 'react-toastify'

interface IInitialState {
    fetchError: string
    isLoading: boolean
    products: IProducts[] | null
    productsFromSeller: IProducts[] | null
    toastId: Id[]
}

const initialState: IInitialState = {
    fetchError: '',
    isLoading: false,
    products: null,
    productsFromSeller: null,
    toastId: [],
}

export const fetchProducts = createAsyncThunk(
    'get/products',
    () => api.products.getProducts()
)

export const fetchProductsProvider = createAsyncThunk(
    'post/products',
    (data: IPostProductsProvider) => api.products.getProductsProvider(data)
)
export const productsSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearError: state => {
            state.fetchError = ''
        },
        clearState: state => {
            state.products = initialState.products
        },
        changeIsLoadingProduct: (state, action: PayloadAction<{ isLoading: boolean }>) => {
            state.isLoading = action.payload.isLoading
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
            if (payload){
                state.products = payload.data
            }
            state.fetchError = ''


            const successToastId = state.toastId.find(id => {
                return toast.isActive(id)
            })
            if (successToastId){
                toast.update(successToastId, { type: toast.TYPE.SUCCESS, render: 'Товар загружен', autoClose: 3000, isLoading: false })
                state.toastId = state.toastId.filter(id => id !== successToastId)
            }
        })
        builder.addCase(fetchProducts.pending, state => {
            state.isLoading = true
            const idToast = toast.info('Пожалуйста подождите', { isLoading: true })
            state.toastId.push(idToast)
        })
        builder.addCase(fetchProducts.rejected, (state, { error }) => {
            state.isLoading = false
            state.fetchError = error.message as string
            const successToastId = state.toastId.find(id => {
                return toast.isActive(id)
            })
            if (successToastId){
                state.toastId = state.toastId.filter(id => id !== successToastId)
                toast.update(successToastId, { type: toast.TYPE.ERROR, render: 'Произошла ошибка, попробуйте позже', autoClose: 3000, isLoading: false })
            } else {
                toast.error('Произошла непредвиденная ошибка, попробуйте позже')
            }
        })

        builder.addCase(fetchProductsProvider.fulfilled, (state, { payload, meta }) => {
            if (state.products){
                state.products = state.products.map(value => {
                    payload.data.forEach(valueProvider => {
                        if (value.id === valueProvider.id){
                            value.count = valueProvider.count
                        }
                    })
                    return value
                })
                state.productsFromSeller = payload.data.sort((a, b) => {
                    return meta.arg.ids.indexOf(a.id) - meta.arg.ids.indexOf(b.id)
                })
            }

            const successToastId = state.toastId.find(id => {
                return toast.isActive(id)
            })
            if (successToastId){
                toast.update(successToastId, { type: toast.TYPE.SUCCESS, render: 'Товар обновлен', autoClose: 3000, isLoading: false })
                state.toastId = state.toastId.filter(id => id !== successToastId)
            }
            state.fetchError = ''
        })
        builder.addCase(fetchProductsProvider.pending, state => {
            state.isLoading = true
            const idToast = toast.info('Пожалуйста подождите', { isLoading: true })
            state.toastId.push(idToast)
        })
        builder.addCase(fetchProductsProvider.rejected, (state, { error }) => {
            state.isLoading = false
            state.fetchError = error.message as string
            const successToastId = state.toastId.find(id => {
                return toast.isActive(id)
            })
            if (successToastId){
                state.toastId = state.toastId.filter(id => id !== successToastId)
                toast.update(successToastId, { type: toast.TYPE.ERROR, render: 'Произошла ошибка, попробуйте позже', autoClose: 3000, isLoading: false })
            } else {
                toast.error('Произошла непредвиденная ошибка, попробуйте позже')
            }
        })
    },
})

