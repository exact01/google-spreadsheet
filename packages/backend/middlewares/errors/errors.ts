import type { NextFunction, Request, Response } from 'express'
async function processingErrors(err: { statusCode: number, message: string }, _req: Request, res: Response, _next: NextFunction) {
    const { statusCode = 500, message } = err
    return res.status(statusCode).send(
        { message: statusCode === 500 ?
            message
                ? message : 'Sorry, an error occurred on the server'
            : message }
    )
}

export {
    processingErrors
}