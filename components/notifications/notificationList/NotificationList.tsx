import { List, Spin } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { NotificationObj } from '../../../api/notifications/dataTypes';
import NotificationItem from '../notificationItem/NotificationItem';
import styles from './NotificationList.module.scss';

interface NotificationListProps {
  notifications: NotificationObj[];
  loading: boolean;
  hasMore: boolean;
  handleInfiniteOnLoad: () => void;
}

const NotificationList: React.FC<NotificationListProps> = (
  props: NotificationListProps
) => {
  const { loading, hasMore, notifications, handleInfiniteOnLoad } = props;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Notifications</div>
        <div className={styles['mark-all']}>Mark all as Read</div>
      </div>
      <div className={styles.list}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
          <List
            dataSource={notifications}
            renderItem={(item) => (
              <NotificationItem key={item.id} data={item} />
            )}
          >
            {loading && hasMore && (
              <div className={styles['loading-container']}>
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default NotificationList;
