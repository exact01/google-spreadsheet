import type { Response } from 'express'
import { IAccessToken } from '@/service/jwt/interfeces'
import { DOMAIN } from '@/utils/constants'

export async function setCookie(res: Response, { accessToken }: IAccessToken){
    res.cookie('accessToken', accessToken, { maxAge:  30 * 24 * 60 * 60 * 1000, httpOnly: true , domain: '.'+DOMAIN })
}