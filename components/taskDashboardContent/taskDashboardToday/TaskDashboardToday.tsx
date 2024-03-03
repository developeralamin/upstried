/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import styles from './TaskDashboardToday.module.scss';
import moment from 'moment';
import TaskDashboardAPI from '../../../api/task-dashboard/request';
import NoTaskLeftSVG from '../svgs/NoTaskLeft';
import DashboardTips from '../taskDashboardTips/DashboardTips';
import { Spin } from 'antd';
import { sortTipsList } from '../utilities/TipsFilter';
import {
  TipsTaskDashboard,
  ResponseAll,
} from '../../../api/task-dashboard/dataTypes';

const TaskDashboardToday = () => {
  const [activeViewTask, setActiveViewTask] = useState('');
  const [tipsList, setTipsList] = useState<TipsTaskDashboard[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const startDate: string = moment().format('YYYY-MM-DD');
  const endDate: string = moment().format('YYYY-MM-DD');

  useEffect(() => {
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
  }, []);

  const { inCompleteTipsList, completedTipsList } = sortTipsList(tipsList);

  return (
    <div className={styles.Container}>
      <p className={styles.Day}>Today</p>
      <p className={styles.Date}>{moment().format('ddd, DD MMMM')}</p>
      <p className={styles.TodoTitle}>To-do</p>
      <hr className={styles.HzLine} />
      <div className={styles.Spinner}>
        <Spin spinning={loading}>
          {inCompleteTipsList.map((tips: TipsTaskDashboard) => {
            return (
              <DashboardTips
                key={tips.tipsSlug}
                tipsList={tipsList}
                setTipsList={setTipsList}
                tips={tips}
                activeViewTask={activeViewTask}
                setActiveViewTask={setActiveViewTask}
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

export const NoTaskLeft = () => {
  return (
    <div className={styles.NoTaskLeft}>
      <NoTaskLeftSVG />
      <p className={styles.NoTaskLEftText}>
        No Tips left for today. Stay healthy, stay productive.
        <br />
        See you tomorrow.
      </p>
    </div>
  );
};

export default TaskDashboardToday;
