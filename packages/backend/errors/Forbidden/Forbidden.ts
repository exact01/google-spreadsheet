import { FORBIDDEN_ERRORS } from '@/errors/Forbidden/constants'

class Forbidden extends Error {
    statusCode: number

    constructor(message?: string ) {
        super()
        this.message = message ? message : FORBIDDEN_ERRORS.ACCESS_DENIED
        this.statusCode = 403
    }
}

export {
    Forbidden
}