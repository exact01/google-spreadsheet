class NotFoundError extends Error {
    statusCode: number
    constructor(message?: string) {
        super(message)
        this.message = message ? message : 'Not found'
        this.statusCode = 404
    }
}
export {
    NotFoundError
}