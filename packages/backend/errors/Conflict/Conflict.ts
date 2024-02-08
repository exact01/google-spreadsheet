import { CONFLICT_ERRORS } from '@/errors/Conflict/constants'

class ConflictError extends Error {
    statusCode: number

    constructor(message?: string) {
        super()
        this.message = message ? message : CONFLICT_ERRORS.ACCOUNT_EXISTS
        this.statusCode = 409
    }
}

export {
    ConflictError
}