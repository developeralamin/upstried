import TaskDashboardCalendar from '../../taskDashboardCalendar/TaskDashboardCalendar';
import React, { useEffect, useState } from 'react';
import styles from './TaskDashboardUpcoming.module.scss';
import moment from 'moment';
import TaskDashboardAPI from '../../../api/task-dashboard/request';
import { Spin } from 'antd';
import DashboardTips from '../taskDashboardTips/DashboardTips';
import { sortTipsList } from '../utilities/TipsFilter';
import { NoTaskLeft } from '../taskDashboardToday/TaskDashboardToday';
import {
  ResponseAll,
  TipsTaskDashboard,
} from '../../../api/task-dashboard/dataTypes';

export const TaskDashboardUpcoming = () => {
  const [activeViewTask, setActiveViewTask] = useState('');
  const [tipsList, setTipsList] = useState<TipsTaskDashboard[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [upComingDate, setUpcomingDate] = useState(moment());

  useEffect(() => {
    const startDate = upComingDate.format('YYYY-MM-DD');
    const endDate = upComingDate.format('YYYY-MM-DD');

    setLoading(true);

    TaskDashboardAPI.all(startDate, endDate)
      .then((res: ResponseAll | boolean) => {
        res &&
          (res as ResponseAll).data &&
          setTipsList((res as ResponseAll).data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.error(e);
      });
  }, [upComingDate]);
  const { inCompleteTipsList } = sortTipsList(tipsList);
  return (
    <div className={styles.Container}>
      <TaskDashboardCalendar
        onSelect={(date: moment.Moment) => {
          setUpcomingDate(date);
        }}
        status="upcoming"
      />

      <p className={styles.TodoTitle}>To-do</p>
      <hr />
      <div className={styles.Spinner}>
        <Spin spinning={loading}>
          {inCompleteTipsList.map((tips: TipsTaskDashboard) => {
            return (
              <DashboardTips
                key={tips.tipsSlug}
                tips={tips}
                activeViewTask={activeViewTask}
                setActiveViewTask={setActiveViewTask}
                tipsList={tipsList}
                setTipsList={setTipsList}
                filterDate={upComingDate}
              />
            );
          })}

          {inCompleteTipsList.length === 0 && !loading && <NoTaskLeft />}
        </Spin>
      </div>
    </div>
  );
};

export default TaskDashboardUpcoming;
