import { Divider } from 'antd';
import React from 'react';
import CheckboxSettingItem from './checkboxSettingItem/CheckboxSettingItem';
import styles from './NotificationSettings.module.scss';
import ToggleSettingItem from './toggleSettingItem/ToggleSettingItem';

const NotificationSettings: React.FC = () => {
  return (
    <div className={styles.disable}>
      <div>
        <div className={styles.title}>Push Notification</div>
        <Divider className={styles.divider} />
        <div className={styles.body}>
          <CheckboxSettingItem
            label="Like"
            body="Someone like one of my tips or comments"
            checked={false}
          />
          <CheckboxSettingItem
            label="Comment"
            body="Someone comment on one of my tips"
            checked={true}
          />
          <CheckboxSettingItem
            label="Enroll"
            body="Someone enrolled one of my tips or comments"
            checked={false}
          />
          <CheckboxSettingItem
            label="Reminder"
            body="Task Reminder"
            checked={true}
          />
          <CheckboxSettingItem
            label="Save"
            body="Someone save one of my tips"
            checked={false}
          />
          <CheckboxSettingItem
            label="Follow"
            body="Anyone starts following me"
            checked={false}
          />
        </div>
      </div>
      <div>
        <div className={styles.title}>Email Notification</div>
        <Divider className={styles.divider} />
        <div className={styles.body}>
          <CheckboxSettingItem
            label="Enroll"
            body="When I enroll any tips"
            checked={true}
          />
          <CheckboxSettingItem
            label="Reminder"
            body="When any tips remain incomplete after due time"
            checked={false}
          />
        </div>
      </div>
      <div>
        <div className={styles.title}>
          Newsletter{' '}
          <span>Catch a glimpse of what Virtunus is always upto</span>
        </div>
        <Divider className={styles.divider} />
        <div className={styles.body}>
          <ToggleSettingItem
            label="Weekly Newsletter"
            body="Productivity and personal development related news sent every morning."
            checked={false}
          />
          <ToggleSettingItem
            label="What's new"
            body="Exclusive feature updates which Virtunus Team bringing you to make your life easier. Sent once in a month."
            checked={false}
          />
          <ToggleSettingItem
            label="Productivity Ideas & Tricks"
            body="Catchy ideas and tricks which helps to reshape your productivity. Sent once in a week."
            checked={false}
          />
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
