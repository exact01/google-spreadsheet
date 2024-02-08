import React from 'react'
import styles from '@/pages/auth/styles.module.scss'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'

interface IProps {
    register: UseFormRegister<any>
    errors: Partial<FieldErrorsImpl<any>>
    label?: string
    htmlFor?: string
    state: string
    type: string
    children?: React.ReactNode
}

export default function InputAuth({ register, type, label, errors, state, htmlFor, children }: IProps) {
    return (
        <div className={styles.authorization__boxInput}>
            {label &&
                <label htmlFor={htmlFor} className={styles.authorization__label}>
                    {label}
                </label>
            }
            <input
                {...register(state)}
                type={type}
                id={htmlFor}
                className={`${styles.authorization__input} ${
                    errors[state] && styles.authorization__input_red}
                                `}
            />
            {children}
        </div>
    )
}

