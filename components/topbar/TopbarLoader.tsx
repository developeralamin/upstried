import { Skeleton } from 'antd'
import React from 'react'
import styles from './Topbar.module.scss'
export default function TopbarLoader() {
    return (
        <div className={styles.TopbarLoader}>
            <div className="container">
                <div className={styles.Wrapper}>
                    <div className={styles.Start}>
                        <div className={styles.Brand}>
                            <Skeleton className={styles.LoadingLogo} loading active paragraph={{ rows: 1 }} />
                        </div>
                        <div className={styles.BrandMini}>
                            <Skeleton.Image className={styles.LoadingLogo} />
                        </div>
                    </div>
                    <div className={styles.SearchBox}>
                        <Skeleton className={styles.LoadingSearch} loading active paragraph={{ rows: 1 }} />
                    </div>
                    <div className={styles.RightWrapper}>
                        <div className={styles.LoadingRight}>
                            <Skeleton className={styles.LoadingSignup} loading active paragraph={{ rows: 1 }} />
                            <Skeleton.Avatar size={40} className={styles.LoadingProfile} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
