import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Dropdown, message } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { NotificationAPI } from '../../api/notifications/request';
import { ProfileObj } from '../../api/profile/dataTypes';
import reducer, {
  addNotifications,
  setNotifications,
} from '../../reducers/notification';
import {
  initiliazePushNotifications,
  notificationChannelInitialization,
} from '../../services/firebase';
import NotificationList from './notificationList/NotificationList';
import styles from './Notifications.module.scss';

interface NotificationsProps {
  profile: ProfileObj;
}

const Notifications: React.FC<NotificationsProps> = () => {
  const [state, dispatch] = React.useReducer(reducer, []);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  React.useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response =
          await new NotificationAPI().fetchNotificationFromServer(page);
        dispatch(setNotifications(response));
        setPage(page + 1);
        if (response.length === 0) {
          setHasMore(false);
        }
      } catch (exception) {
        console.error(exception);
      }
    };

    /** fetch existing notifications */
    fetchNotifications();

    /** initialize the firebase channel */
    notificationChannelInitialization((requested) => {
      dispatch(addNotifications(requested || []));
    });

    initiliazePushNotifications();
  }, []);

  const onVisibleChange = async (requestedVisibility: boolean) => {
    try {
      setVisible(requestedVisibility);
      requestedVisibility &&
        (await new NotificationAPI().requestAllNotificationsAsRead());
    } catch (exception) {
      console.error(exception);
      message.error(
        'Oops. Something went wrong! Please check your network connection.'
      );
    }
  };

  const handleInfiniteOnLoad = async () => {
    setLoading(true);
    if (hasMore) {
      try {
        const response =
          await new NotificationAPI().fetchNotificationFromServer(page);
        dispatch(addNotifications(response || []));
        setPage(page + 1);
        if (response.length === 0) {
          setHasMore(false);
        }
      } catch (exception) {
        message.error('Oops. Something went wrong!');
        console.error(exception);
      }
    }
    setLoading(false);
  };

  const unReadCount = state.filter((iter) => !iter.isRead).length;

  return (
    <div>
      <Dropdown
        visible={visible}
        overlay={
          <NotificationList
            notifications={state}
            hasMore={hasMore}
            loading={loading}
            handleInfiniteOnLoad={handleInfiniteOnLoad}
          />
        }
        trigger={['click']}
        placement="bottomRight"
        onVisibleChange={onVisibleChange}
      >
        <div className={styles.Notification}>
          {unReadCount ? <img src="/notificationBadge.svg" alt="icon" /> : null}

          <i
            className={`${styles.BellIcon} icon-Vector-12 ${
              visible ? styles.BellIcon_Active : ''
            }`}
          ></i>
        </div>
      </Dropdown>
    </div>
  );
};

export default Notifications;
