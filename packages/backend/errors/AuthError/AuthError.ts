import { AUTH_ERRORS } from '@/errors/AuthError/constants'

class AuthError extends Error {
    statusCode: number
    constructor(message?: string) {
        super()
        this.message = message ? message : AUTH_ERRORS.ACCESS_DENIED
        this.statusCode = 401
    }
}

export {
    AuthError
}