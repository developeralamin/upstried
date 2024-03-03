import { Avatar, Skeleton } from 'antd';
import React from 'react';
import styles from './SearchLoader.module.scss';
const SearchLoader: React.FC = () => {
  return (
    <div className={styles.SearchLoader}>
      <h5 className={styles.Title}>Tips</h5>
      <ul className={styles.ItemList}>
        <li className={styles.Item}>
          <Avatar size={40} shape="square" />
          <Skeleton loading active paragraph={{ rows: 1 }} />
        </li>
        <li className={styles.Item}>
          <Avatar size={40} shape="square" />
          <Skeleton loading active paragraph={{ rows: 1 }} />
        </li>
      </ul>
      <h5 className={styles.Title}>Author</h5>
      <ul className={styles.ItemList}>
        <li className={styles.Item}>
          <Avatar size={40} />
          <Skeleton loading active paragraph={{ rows: 1 }} />
        </li>
        <li className={styles.Item}>
          <Avatar size={40} />
          <Skeleton loading active paragraph={{ rows: 1 }} />
        </li>
      </ul>
    </div>
  );
};

export default SearchLoader;
