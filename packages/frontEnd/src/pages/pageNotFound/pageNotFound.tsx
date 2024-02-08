import React from 'react'
import styles from './pageNotFound.module.scss'
import { Link } from 'react-router-dom'

export function PageNotFound() {
    return (
        <div className={styles.page404}>
            <p className={styles.page404_status}>404</p>
            <p className={styles.page404_text}>Страница не найдена</p>
            <Link className={styles.page404_button} to={'/home'}>Домой</Link>
        </div>
    )
}

export default PageNotFound
