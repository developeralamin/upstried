import { Skeleton } from 'antd';
import React from 'react';
import styles from './EmptyTips.module.scss';

const EmptyTips: React.FC = () => {
  return (
    <div className={styles.EmptyTips}>
      <div className={styles.Item}>
        <Skeleton.Image className={styles.Image} />
        <Skeleton loading active title paragraph={{ rows: 2 }} />
      </div>
      <div className={styles.Item}>
        <Skeleton.Image className={styles.Image} />
        <Skeleton loading active title paragraph={{ rows: 2 }} />
      </div>
      <div className={styles.Item}>
        <Skeleton.Image className={styles.Image} />
        <Skeleton loading active title paragraph={{ rows: 2 }} />
      </div>
    </div>
  );
};

export default EmptyTips;
