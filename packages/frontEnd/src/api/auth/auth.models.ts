export interface ILoginRequest {
    email: string,
    password: string
}

export interface IResultLogin {
    isLoginIn: boolean
}
export interface IRegisterRequest extends ILoginRequest{}

