import cors from 'cors'
import express, { Express, NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import { corsOptions, SERVER_PORT } from '@/utils/constants'
import { errors } from 'celebrate'
import { indexRouters } from '@/routes'
import { isAuthorized } from '@/middlewares/isAuthorized'
import { NotFoundError } from '@/errors/NotFoundError'
import { processingErrors } from '@/middlewares/errors'
import { dbConnect } from '@/databases/sequlize/init'
import cookieParser from 'cookie-parser'

export async function startServer() {
    const app: Express = express()
    await dbConnect()
    app.enable('trust proxy')
    app.use(express.json({ limit: '300kb' }))
    app.use(cookieParser())
    app.use(helmet({ contentSecurityPolicy: true }))
    app.use(cors( corsOptions ))
    app.use(express.urlencoded({ extended: true }))
    app.use(indexRouters)
    app.use(isAuthorized, (_req: Request, _res: Response, next: NextFunction) => next(new NotFoundError()))
    app.use(errors())
    app.use(processingErrors)
    app.listen(SERVER_PORT || 3001)
}