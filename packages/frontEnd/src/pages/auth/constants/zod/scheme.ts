import { z } from 'zod'
import { zodValidation } from '@/utils/validation/validation'

export const authSchema = z.object({
    email: zodValidation.email,
    password: zodValidation.password,
}).refine(data => {
    const allowedDomains = ['yandex.ru', 'gmail.com', 'mail.ru', 'ya.com', 'ya.ru']
    const emailDomain = data.email.split('@')[1]
    return allowedDomains.includes(emailDomain)
}, {
    message:'Это не почта yandex.ru или gmail.com',
    path: ['email'],
})

