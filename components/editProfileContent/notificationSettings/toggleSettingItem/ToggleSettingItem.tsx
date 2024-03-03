import { Switch } from 'antd';
import React from 'react';
import styles from './ToggleSettingItem.module.scss';

interface ToggleSettingItemProps {
  label: string;
  body: string;
  checked: boolean;
}

const ToggleSettingItem: React.FC<ToggleSettingItemProps> = (
  props: ToggleSettingItemProps
) => {
  const { label, body, checked } = props;
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <Switch checked={checked} />
      </div>
      <div className={styles.body}>{label}</div>
      <div className={styles.tail}>{body}</div>
    </div>
  );
};

export default ToggleSettingItem;
