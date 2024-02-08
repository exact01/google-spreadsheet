export interface IGetUserByEmail{
    email: string
}

export interface IGetUserById{
    id: number
}

export interface ICreateUser extends IGetUserByEmail {
    hashPassword: string
}