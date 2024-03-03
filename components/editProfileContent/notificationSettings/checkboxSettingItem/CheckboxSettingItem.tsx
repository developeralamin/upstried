import { Checkbox } from 'antd';
import React from 'react';
import styles from './CheckboxSettingItem.module.scss';

interface CheckboxSettingItemProps {
  label: string;
  body: string;
  checked: boolean;
}

const CheckboxSettingItem: React.FC<CheckboxSettingItemProps> = (
  props: CheckboxSettingItemProps
) => {
  const { label, body, checked } = props;
  return (
    <div className={styles.container}>
      <div className={styles.head}>{label}</div>
      <div className={styles.body}>{body}</div>
      <div className={styles.tail}>
        <Checkbox checked={checked} />
      </div>
    </div>
  );
};

export default CheckboxSettingItem;
