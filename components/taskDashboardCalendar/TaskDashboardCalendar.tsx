import { Button } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import TaskAdvCalendar from './taskAdvCalendar.tsx/TaskAdvCalendar';
import styles from './TaskDashboardCalendar.module.scss';
import TaskHorizontalCalendar from './taskHorizontalCalendar/TaskHorizontalCalendar';
interface Props {
  onSelect: (date: moment.Moment) => void;
  status?: string;
}
export default function TaskDashboardCalendar(props: Props) {
  const [filterDay, setFilterDay] = useState(moment());
  const [incremeantCount, setIncremeantCount] = useState(0);
  const onDateChangeHandler = (date: moment.Moment) => {
    setFilterDay(date);
    props.onSelect(date);
  };
  const incrementDay = () => {
    if (props.status != 'overdue') {
      if (incremeantCount >= 730) {
        return;
      }
      setFilterDay(moment(filterDay).add(1, 'days'));
      setIncremeantCount(incremeantCount + 1);
    } else {
      if (moment(filterDay).isSame(moment(), 'days')) {
        return;
      }
      setFilterDay(moment(filterDay).add(1, 'days'));
      setIncremeantCount(incremeantCount + 1);
    }
  };
  const decrementDay = () => {
    if (props.status != 'overdue') {
      if (moment(filterDay).isSame(moment(), 'days')) {
        return;
      }
      setFilterDay(moment(filterDay).subtract(1, 'days'));
    } else {
      if (incremeantCount <= -730) {
        return;
      }
      setFilterDay(moment(filterDay).subtract(1, 'days'));
      setIncremeantCount(incremeantCount - 1);
    }
  };
  const onWeekDaySelect = (weekDay: any) => {
    setFilterDay(weekDay);
    props.onSelect(weekDay);
  };
  return (
    <div className={styles.TaskDashboardCalendar}>
      <div className={styles.Top}>
        <div className={styles.Left}>
          <TaskAdvCalendar
            filterDate={filterDay}
            onChangeDate={onDateChangeHandler}
            status={props.status}
          />
        </div>
        <div className={styles.Right}>
          <Button
            onClick={() => {
              props.onSelect(moment());
              setFilterDay(moment());
            }}
            className={styles.Today}
          >
            Today
          </Button>
          <div className={styles.Navigation}>
            <Button onClick={decrementDay} className={styles.NavigationBtn}>
              <img src="/task-dashboard/arrow-prev.svg" alt="icon" />
            </Button>
            <Button onClick={incrementDay} className={styles.NavigationBtn}>
              <img src="/task-dashboard/arrow-next.svg" alt="icon" />
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.Bottom}>
        <div className={styles.Left}>
          <span className={styles.WeekDay}>{filterDay.format('dddd')}</span>
          <span className={styles.Date}>
            {filterDay.format('D MMMM, YYYY')}
          </span>
        </div>
        <div className={styles.Right}>
          <TaskHorizontalCalendar
            onSelect={onWeekDaySelect}
            filterDay={filterDay}
            status={props.status}
          />
        </div>
      </div>
    </div>
  );
}
