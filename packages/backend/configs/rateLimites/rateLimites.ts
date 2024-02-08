import rateLimit, { RateLimitExceededEventHandler } from 'express-rate-limit'
import type { Request } from 'express'

const handler: RateLimitExceededEventHandler = async (req, res, _next) => {
    // TODO
    // Должен быть сервис по блокировке айпи, подобие cloudFlare!
    const ip = getClientIp(req)
    if (!ip){
        res.status(429).send({ message: 'You can\'t make any more requests at the moment.' })
        return
    }
    res.status(429).send({ message: 'You can\'t make any more requests at the moment. Your ip have a block' })

}

export const limiterAuth = rateLimit(
    {
        windowMs:  60 * 1000,
        max: 10,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message: 'You can\'t make any more requests at the moment. Try again later' },
        handler: handler,
    }
)

export const limiter = rateLimit(
    {
        windowMs: 60 * 1000,
        max:  60,
        standardHeaders: true,
        legacyHeaders: false,
        message: { message: 'You can\'t make any more requests at the moment. Try again later' },
        handler: handler,
    }
)

const getClientIp = (req: Request): string | null => {
    const ipHeaders = [
        'cf-connecting-ip',
        'x-forwarded-for',
        'x-real-ip',
        'true-client-ip',
    ]

    for (const header of ipHeaders) {
        const ip = req.headers[header]
        if (ip) {
            if (typeof ip === 'string') {
                return ip.split(',')[0].trim()
            } else if (Array.isArray(ip)) {
                return ip[0].trim()
            }
        }
    }
    return null
}