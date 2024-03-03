import { Skeleton } from 'antd';
import React from 'react';
import styles from './EmptyAuthors.module.scss';

const EmptyAuthors: React.FC = () => {
  return (
    <div className={styles.EmptyAuthors}>
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
      <div className={styles.Item}>
        <Skeleton.Image className={styles.Image} />
        <Skeleton loading active title paragraph={{ rows: 2 }} />
      </div>
    </div>
  );
};

export default EmptyAuthors;
