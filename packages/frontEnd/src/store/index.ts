import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authSlice } from '@/store/slices/auth'
import { productsSlice } from '@/store/slices/products'
export const rootReducer = combineReducers({
    auth: authSlice.reducer,
    products: productsSlice.reducer,
})
export const setupStore = (initialState = {}) => configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>{
        return getDefaultMiddleware({
            serializableCheck: false,
        })
    },
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
