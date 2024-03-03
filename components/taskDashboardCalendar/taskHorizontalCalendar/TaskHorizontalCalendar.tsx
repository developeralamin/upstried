import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DateItem from './dateItem/DateItem';
import styles from './TaskHorizontalCalendar.module.scss';

interface Props {
  filterDay: moment.Moment;
  onSelect: (weekDay: any) => void;
  status?: string;
}

function TaskHorizontalCalendar(props: Props) {
  const { filterDay, onSelect, status } = props;
  useEffect(() => {
    const baseDay = filterDay || moment();
    const baseWeekDay = baseDay.weekday();
    const newDates = getNewDates(baseDay, baseWeekDay);
    setDates(newDates);
  }, [filterDay]);

  const [dates, setDates] = useState<moment.Moment[]>([]);

  const getNewDates = (
    baseDay: moment.Moment,
    baseWeekDay: number
  ): Array<moment.Moment> => {
    const newDates: moment.Moment[] = [];
    for (let i = 0; i < baseWeekDay; i++) {
      newDates.push(moment(baseDay).subtract(baseWeekDay - i, 'days'));
    }
    newDates.push(moment(baseDay));
    for (let i = 1; i < 7 - baseWeekDay; i++) {
      newDates.push(moment(baseDay).add(i, 'days'));
    }
    return newDates;
  };

  return (
    <div className={styles.TaskHorizontalCalendar}>
      <div className={styles.Dates}>
        {dates.map((iter, index) => (
          <DateItem
            onSelect={onSelect}
            date={iter}
            key={index}
            filterDay={filterDay}
            status={status}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskHorizontalCalendar;
