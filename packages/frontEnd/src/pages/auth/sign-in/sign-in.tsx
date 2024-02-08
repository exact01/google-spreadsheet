import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import styles from '../styles.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/hooks/redux'
import { authSlice, fetchLogin, fetchUser } from '@/store/slices/auth'
import { InputAuth } from '@/components/UI/auth/inputAuth'
import { ErrorAuth } from '@/components/UI/auth/errorAuth'
import { authSchema, TAuthSchema } from '@/pages/auth/constants/zod'
import { ILoginRequest } from '@/api/auth/auth.models'
import { LogIn } from 'lucide-react'

const SignIn: React.FC = () => {
    useEffect(() => {
        return () => {
            dispatch(authSlice.actions.clearError())
        }
    }, [])

    const dispatch = useAppDispatch()

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm<TAuthSchema>({
        mode: 'onChange',
        resolver: zodResolver(authSchema),
    })

    const onSubmit = (data: ILoginRequest) => {
        dispatch(fetchLogin(data)).then(() => {
            dispatch(fetchUser())
        })
    }

    return (
        <section className={styles.authorization}>
            <span className={styles.authorization__spanTop}></span>
            <div className={styles.authorization__container}>
                <h1 className={styles.authorization__title}> Добро пожаловать </h1>
                <LogIn className={styles.ico}/>
                <form className={styles.authorization__form} onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className={styles.authorization__fieldset}>
                        <InputAuth
                            register={register}
                            state='email'
                            htmlFor='email'
                            type='email'
                            errors={errors}
                            label='E-mail'
                        />
                        <ErrorAuth
                            errors={errors}
                            state='email'
                        />
                        <InputAuth
                            register={register}
                            state='password'
                            htmlFor='password'
                            type='password'
                            errors={errors}
                            label='Пароль'
                        >
                        </InputAuth>
                        <ErrorAuth
                            errors={errors}
                            state='password'
                        />
                    </fieldset>
                    <button
                        disabled={!isValid}
                        type='submit'
                        name='save'
                        className={`${styles.authorization__formSubmit}`}
                    >
                       Войти
                    </button>
                </form>
                <div className={styles.authorization__toggle}>
                    <p className={styles.authorization__question}>Не зарегистрированы?</p>
                    <Link to='/sign-up' className={styles.authorization__link}>
                        Зарегистрироваться
                    </Link>
                </div>
            </div>
            <span className={styles.authorization__spanButtom}></span>
        </section>
    )
}

export default SignIn


