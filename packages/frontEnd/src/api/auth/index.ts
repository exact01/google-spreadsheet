import { request } from '@/api/request'
import { ILoginRequest, IRegisterRequest, IResultLogin } from '@/api/auth/auth.models'
import { IUser } from '@/store/slices/auth/auth.models'
import { AxiosResponse } from 'axios'
export default {
    login(data: ILoginRequest) {
        return request<AxiosResponse<IResultLogin>>({
            url: __SERVER_URL__ + '/auth/sign-in',
            method: 'POST',
            data,
        })
    },
    register(data: IRegisterRequest) {
        return request<AxiosResponse<IResultLogin>>({
            url: __SERVER_URL__ + '/auth/sign-up',
            method: 'POST',
            data,
        })
    },
    user() {
        return request<AxiosResponse<IUser>>({
            url: __SERVER_URL__ + '/users/me',
            method: 'GET',
        })
    },
    logout() {
        return request<AxiosResponse<IResultLogin>>({
            url: __SERVER_URL__ + '/auth/logout',
            method: 'GET',
        })
    },
}
