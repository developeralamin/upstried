import { BellFilled } from '@ant-design/icons';
import { Avatar } from 'antd';
import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import { NotificationObj } from '../../../api/notifications/dataTypes';
import { TIPS_ROUTE } from '../../../config/routes';
import styles from './NotificationItem.module.scss';

interface NotificationItemProps {
  data: NotificationObj;
}

const NotificationItem: React.FC<NotificationItemProps> = (
  props: NotificationItemProps
) => {
  const { data } = props;
  const onClickHandler = () => {
    switch (data.type) {
      case 'tips_published':
      case 'published_tips_updated':
        window.location.href = TIPS_ROUTE + '/' + (data.object?.slug || '');
        break;
      case 'tips_unpublished':
      case 'tips_upcoming_task':
      case 'tips_due_task':
        window.location.href =
          TIPS_ROUTE + '/enrollments/' + data.enrollmentId + '/practice';
        break;
      case 'tips_overdue_task':
        window.location.href =
          TIPS_ROUTE +
          '/' +
          (data.object?.slug || '') +
          '/practice?tab=overdue';
        break;
      case 'tips_enrolled':
      case 'tips_liked':
      case 'author_is_followed':
        window.location.href = '/authors/' + (data.subject?.username || '');
        break;
      case 'tips_comment':
      case 'tips_comment_liked':
        window.location.href =
          TIPS_ROUTE + '/' + (data.object?.slug || '') + '?comments=show';
        break;
    }
  };

  return (
    <div
      className={clsx({
        [styles.container]: true,
        [styles['container-read']]: data.isRead,
      })}
      onClick={onClickHandler}
    >
      <div className={styles.icon}>
        {data.subject ? (
          <Avatar
            className={styles.avatar}
            src={
              data.subject.avatar && data.subject.avatar !== ''
                ? data.subject.avatar
                : null
            }
          >
            {data.subject.name?.substring(0, 2)}
          </Avatar>
        ) : data.object ? (
          <Avatar
            className={styles.avatar}
            src={
              data.object.avatar && data.object.avatar !== ''
                ? data.object.avatar
                : null
            }
          >
            {data.object.name?.substring(0, 2)}
          </Avatar>
        ) : (
          <BellFilled />
        )}
      </div>
      <div>
        <div className={styles.content}>
          <strong>{data.subject ? data.subject?.name + ' ' || '' : ''}</strong>
          {data.message}
          <strong>{data.object ? ' ' + data.object?.name : ''}</strong>.
        </div>
        <div className={styles.meta}>
          <div>
            {data.createdAt
              ? moment(data.createdAt).fromNow()
              : moment().fromNow()}
          </div>
        </div>
      </div>
      <div className={styles.read}>
        {!data.isRead && <div className={styles.circle}></div>}
      </div>
    </div>
  );
};

export default NotificationItem;
