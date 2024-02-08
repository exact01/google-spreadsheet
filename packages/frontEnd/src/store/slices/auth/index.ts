import api from '@/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ILoginRequest, IRegisterRequest } from '@/api/auth/auth.models'
import { IUser } from '@/store/slices/auth/auth.models'
import { Id, toast } from 'react-toastify'

export interface IInitialState {
    authError: string
    authErrorCode: number | null
    isAuthLoading: boolean
    user: IUser | null
    isLoggedIn: boolean | null
    toastId: Id[]
}

export const initialState: IInitialState = {
    authError: '',
    authErrorCode: null,
    isAuthLoading: true,
    user: null,
    isLoggedIn: null,
    toastId: [],
}

export const fetchLogin = createAsyncThunk(
    'auth/fetchLogin',
    (data: ILoginRequest) => api.auth.login(data)
)

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    (data: IRegisterRequest) => api.auth.register(data)
)

export const fetchUser = createAsyncThunk('auth/fetchUser', () =>
    api.auth.user().then(async userResponse => {
        return {
            user: userResponse.data,
        }
    })
)

export const fetchLogout = createAsyncThunk('auth/fetchLogout', () =>
    api.auth.logout()
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: state => {
            state.authError = ''
            state.authErrorCode = null
        },
        setLoaderState: (state, action) => {
            state.isAuthLoading = action.payload
        },
        clearState: _state => {
            return initialState
        },
    },
    extraReducers: builder => {
        // login
        builder.addCase(fetchLogin.fulfilled, state => {
            state.authError = ''
            const successToastId = state.toastId.find(id => {
                return toast.isActive(id)
            })
            if (successToastId){
                toast.update(successToastId, { type: toast.TYPE.SUCCESS, render: 'Успешная авторизация', autoClose: 1000, isLoading: false })
                state.toastId = state.toastId.filter(id => id !== successToastId)
            }
        })
        builder.addCase(fetchLogin.pending, state => {
            const toastId = toast.info('Пожалуйста подождите', { isLoading: true })
            state.toastId.push(toastId)
            state.authError = ''
        })
        builder.addCase(fetchLogin.rejected, (state, { error }) => {
            state.authError = error.message as string
            const successToastId = state.toastId.find(id => {
                return toast.isActive(id)
            })
            if (successToastId){
                toast.update(successToastId, { type: toast.TYPE.WARNING, render: 'Произошла ошибка, попробуйте позже!', autoClose: 7000, isLoading: false })
                state.toastId = state.toastId.filter(id => id !== successToastId)
            } else {
                toast.error('Произошла непредвиденная ошибка, попробуйте позже')
            }
        })
        // registration
        builder.addCase(fetchRegister.fulfilled, state => {
            state.authError = ''
            const successToastId = state.toastId.find(id => {
                return toast.isActive(id)
            })
            if (successToastId){
                toast.update(successToastId, { type: toast.TYPE.SUCCESS, render: 'Успешная авторизация', autoClose: 1000, isLoading: false })
                state.toastId = state.toastId.filter(id => id !== successToastId)
            }
        })
        builder.addCase(fetchRegister.pending, state => {
            const toastId = toast.info('Ожидайте ответа от сервера', { isLoading: true })
            state.toastId.push(toastId)
        })
        builder.addCase(fetchRegister.rejected, (state, { error }) => {
            state.authError = error.message as string
            const successToastId = state.toastId.find(id => {
                return toast.isActive(id)
            })
            if (successToastId){
                toast.update(successToastId, { type: toast.TYPE.WARNING, render: 'Произошла ошибка, попробуйте позже!', autoClose: 7000, isLoading: false })
                state.toastId = state.toastId.filter(id => id !== successToastId)
            } else {
                toast.error('Произошла непредвиденная ошибка, попробуйте позже')
            }
        })
        // user
        builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
            payload && (state.user = payload.user)
            state.isLoggedIn = true
            state.isAuthLoading = false
        })
        builder.addCase(fetchUser.pending, state => {
            state.isAuthLoading = true
        })
        builder.addCase(fetchUser.rejected, state => {
            state.user = null
            state.isLoggedIn = false
            state.isAuthLoading = false
        })
        // user
        builder.addCase(fetchLogout.fulfilled, state => {
            state.isLoggedIn = false
            state.user = null
        })
    },
})
