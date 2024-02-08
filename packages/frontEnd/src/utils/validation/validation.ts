import { z } from 'zod'

export const zodValidation = {
    email: z
        .string()
        .min(1, { message: 'Поле обязательное' })
        .max(40, { message: 'Максимум 40 символо' })
        .email({ message: 'Это не почта' }),
    password: z
        .string()
        .regex(/^[a-zA-Z0-9_]+$/, { message: 'Используйте только латинские буквы' })
        .min(8, { message: 'Минимум 8 символов' })
        .max(40, { message: 'Максимум 40 символов' })
        .regex(/^(?=.*\p{Lu}).*$/gu, { message: 'Нужна хотя бы одна заглавная' })
        .regex(/^(?=.*[0-9]).*$/g, { message: 'Нужна хотя бы 1 цифра' }),
}

