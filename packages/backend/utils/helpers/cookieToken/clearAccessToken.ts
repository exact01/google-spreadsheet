import type { Response } from 'express'
import { DOMAIN } from '@/utils/constants'

export async function clearCookie(res: Response){
    res.clearCookie('accessToken', { domain: '.' + DOMAIN })
}