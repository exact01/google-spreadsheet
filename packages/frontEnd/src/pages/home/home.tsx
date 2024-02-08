import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { authSlice, fetchLogout } from '@/store/slices/auth'
import styles from './styles.module.scss'
import { fetchProducts, productsSlice } from '@/store/slices/products'
import { TableWrapper } from '@/components/table/tableWrapper'
const Home = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.auth.user)
    const products = useAppSelector(state => state.products.products)
    const oneUseEffectRender = useRef(true)
    useEffect(() => {
        if (oneUseEffectRender.current){
            oneUseEffectRender.current = false
            if (!products){
                dispatch(fetchProducts())
            }
        }
        return () => {
            dispatch(authSlice.actions.clearError())
        }
    }, [])

    const onLogout = () => {
        dispatch(fetchLogout())
        dispatch(productsSlice.actions.clearState)
    }
    return (
        <section className={styles.container}>
            <div className={styles.container__wrapper}>
                <h1 className={styles.container__email}>{user?.email}</h1>
                <button onClick={onLogout} className={styles.container__button}>Выйти</button>
            </div>
            <TableWrapper products={products}/>
        </section>
    )
}

export default Home


