import { Joi } from 'celebrate'

export interface ISignInSchema {
    email: string;
    password: string;
}

export interface ISignUpSchema extends ISignInSchema {
}

export const invalidEmailDomainMessage = 'This is not mails yandex, mail, google'
export const invalidPassword = 'Your password must contain at least one uppercase letter and one digit'
export const invalidPassword8CharactersLong = 'Your password must be at least 8 characters long'
export const invalidPassword40CharactersLong = 'Your password must be at most 40 characters long'

const passwordJoi = Joi.string()
    .min(8)
    .max(40)
    .custom((value, helpers) => {
        if (!/(?=.*[A-Z])/.test(value) || !/(?=.*\d)/.test(value)) {
            return helpers.error('custom.pattern')
        }
        return value
    }, 'custom.pattern') // Используйте 'custom.pattern' здесь
    .required()
    .messages({
        'string.min': invalidPassword8CharactersLong,
        'string.max': invalidPassword40CharactersLong,
        'custom.pattern': invalidPassword,
    })

const emailSchema = Joi.string()
    .required()
    .email({ tlds: { allow: false } })
    .custom((value, helpers) => {
        const allowedDomains = ['yandex.ru', 'gmail.com', 'mail.ru', 'ya.ru', 'ya.com']
        const emailDomain = value.split('@')[1]
        if (!allowedDomains.includes(emailDomain)) {
            return helpers.error('any.invalidEmailDomain')
        }
        return value
    }, 'Email Domain Validation')
    .messages({
        'any.invalidEmailDomain': invalidEmailDomainMessage,
    })

export const bodySignIn = Joi.object<ISignInSchema>({
    email: emailSchema,
    password: passwordJoi,
})

export const bodySignUp = bodySignIn