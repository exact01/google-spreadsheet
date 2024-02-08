import React from 'react'
import styles from './preloader.module.scss'
const Preloader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}>
                    <div className={styles.spinner}>
                        <div className={styles.spinner}>
                            <div className={styles.spinner}>
                                <div className={styles.spinner}>
                                    <div className={styles.spinner}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Preloader
