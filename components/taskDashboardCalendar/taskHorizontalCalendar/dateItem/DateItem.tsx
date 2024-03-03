import clsx from 'clsx';
import moment from 'moment';
import React from 'react';
import styles from './DateItem.module.scss';
interface Props {
  date: moment.Moment;
  onSelect: (weekDay: any) => void;
  filterDay: moment.Moment;
  status?: string;
}

function DateItem(props: Props) {
  const { date, onSelect, filterDay, status } = props;
  const isToday = date.isSame(moment(), 'day');
  const isActive = date.isSame(filterDay, 'day');
  let isDisabled = false;
  if (status === 'overdue') {
    isDisabled = date.isAfter(moment(), 'day');
  } else {
    isDisabled = date.isBefore(moment(), 'day');
  }
  return (
    <div
      onClick={() => {
        if (isDisabled) return;
        onSelect(date);
      }}
      className={clsx(
        styles.Item,
        isDisabled && styles.InActive,
        isToday && styles.Today,
        isActive && styles.Active
      )}
    >
      <span className={styles.Date}>{date.format('D')}</span>
      <span className={styles.Day}>{date.format('ddd')}</span>
    </div>
  );
}

export default DateItem;
