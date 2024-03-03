import { Button, DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import styles from './TaskAdvCalendar.module.scss';
interface Props {
  onChangeDate: (date: moment.Moment) => void;
  filterDate: moment.Moment;
  status?: string;
}
function TaskAdvCalendar({ onChangeDate, filterDate, status }: Props) {
  const [date, setDate] = useState<moment.Moment>(moment());
  useEffect(() => {
    setDate(filterDate);
  }, [filterDate]);
  const onChange: any = (date: moment.Moment) => {
    if (!date || date.isBefore(moment(), 'day')) return;
    onChangeDate(date);
    setDate(date);
  };
  const dateFormat = 'MMMM, YYYY';
  // moment max disable date 2 years
  const disabledDate = (current: moment.Moment) => {
    if (status != 'overdue') {
      return (
        (current && current > moment().add(2, 'years')) ||
        current < moment().subtract(1, 'day')
      );
    } else {
      return (
        current > moment() ||
        (current && current < moment().subtract(2, 'years'))
      );
    }
  };
  return (
    <div className={styles.TaskAdvCalendar}>
      <DatePicker
        value={date}
        disabledDate={disabledDate}
        suffixIcon={<img src="/task-dashboard/calendar.svg" alt="icon" />}
        onChange={onChange}
        defaultValue={date}
        format={dateFormat}
        dropdownClassName={styles.CalendarDropdown}
        allowClear={false}
      />
    </div>
  );
}

export default TaskAdvCalendar;
