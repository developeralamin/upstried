import { Skeleton } from 'antd'
import React from 'react'
import styles from './Filter.module.scss'
export default function FilterLoader() {
    return (
        <div className={styles.FilterLoader}>
            <div className="container">
                <div className={styles.Wrapper}>
                    <div className={styles.Start}>
                        <div className={styles.Brand}>
                            <Skeleton className={styles.LoadingLogo} loading active paragraph={{ rows: 1 }} />
                        </div>
                    </div>
                    <div className={styles.SearchBox}>
                        <Skeleton className={styles.LoadingSearch} loading active paragraph={{ rows: 1 }} />
                    </div>
                    <div className={styles.RightWrapper}>
                        <div className={styles.LoadingRight}>
                            <Skeleton className={styles.LoadingSignup} loading active paragraph={{ rows: 1 }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
