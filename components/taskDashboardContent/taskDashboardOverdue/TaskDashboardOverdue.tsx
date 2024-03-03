import moment from 'moment';
import React, { useEffect, useState } from 'react';
import TaskDashboardCalendar from '../../taskDashboardCalendar/TaskDashboardCalendar';
import {
  ResponseAll,
  TipsTaskDashboard,
} from '../../../api/task-dashboard/dataTypes';
import TaskDashboardAPI from '../../../api/task-dashboard/request';
import TaskDashboardUpcoming from '../taskDashBoardUpcoming/TaskDashboradUpcoming';
import styles from './TaskDashboardOverdue.module.scss';
import { Spin } from 'antd';
// import NoTaskLeft from '../svgs/NoTaskLeft';
import { NoTaskLeft } from '../taskDashboardToday/TaskDashboardToday';
import DashboardTips from '../taskDashboardTips/DashboardTips';
import { sortTipsList } from '../utilities/TipsFilter';

const TaskDashboardOverdue = () => {
  const [activeViewTask, setActiveViewTask] = useState('');
  const [tipsList, setTipsList] = useState<TipsTaskDashboard[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [prevDate, setPrevDate] = useState(moment().subtract(1, 'days'));

  useEffect(() => {
    const startDate = prevDate.format('YYYY-MM-DD');
    const endDate = prevDate.format('YYYY-MM-DD');

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
  }, [prevDate]);
  const { inCompleteTipsList, completedTipsList } = sortTipsList(tipsList);

  return (
    <div className={styles.Container}>
      <TaskDashboardCalendar
        onSelect={(date: moment.Moment) => {
          setPrevDate(date);
        }}
        status="overdue"
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
                filterDate={prevDate}
              />
            );
          })}

          {inCompleteTipsList.length === 0 && !loading && <NoTaskLeft />}
        </Spin>
      </div>
      {completedTipsList.length > 0 && inCompleteTipsList.length !== 0 && (
        <p className={styles.CompletedTitle}>Completed</p>
      )}

      {completedTipsList.length > 0 && inCompleteTipsList.length !== 0 && (
        <hr className={styles.HzLine} />
      )}

      {inCompleteTipsList.length !== 0 &&
        completedTipsList.map((tips: TipsTaskDashboard) => {
          return (
            <DashboardTips
              key={tips.tipsSlug}
              completedTips={true}
              setActiveViewTask={setActiveViewTask}
              tips={tips}
              tipsList={tipsList}
              setTipsList={setTipsList}
            />
          );
        })}
    </div>
  );
};

export default TaskDashboardOverdue;
