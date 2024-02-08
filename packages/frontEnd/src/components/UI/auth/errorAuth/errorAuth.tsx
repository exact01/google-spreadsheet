import React from 'react'
import styles from '@/pages/auth/styles.module.scss'
import { FieldErrorsImpl } from 'react-hook-form'
interface IErrorAuth{
    state: string
    errors: Partial<FieldErrorsImpl<any>>
}
function ErrorAuth({ state, errors }: IErrorAuth) {
    return (
        <div className={styles.authorization__boxSpanErrorMessage}>
            <span className={styles.authorization__errorMessage}>
                {`${errors[state] ? errors[state]?.message: ''}`}
            </span>
        </div>
    )
}

export default ErrorAuth