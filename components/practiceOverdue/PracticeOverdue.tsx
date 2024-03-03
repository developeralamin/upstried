/* eslint-disable jsx-a11y/alt-text */
import moment from 'moment';
import React from 'react';
import { TaskObj } from '../../api/tasks/dataTypes';
import { updateTimeTaskCompleteInterface } from '../../interfaces/practice.interface';
import { getOverdueDates, getPendingTasks } from '../../services/TaskFilter';
import PracticeTasksList from '../practiceTasksList/PracticeTasksList';
import styles from './PracticeOverdue.module.scss';

interface PracticeOverdueProps {
  tasks: TaskObj[];
  onTaskAction: updateTimeTaskCompleteInterface;
  loading: boolean;
}

const PracticeOverdue: React.FC<PracticeOverdueProps> = (
  props: PracticeOverdueProps
) => {
  const { onTaskAction } = props;
  const overdueDates = getOverdueDates(props.tasks);
  const noOverdueTaskFound = (
    <div className={styles.noOverdueTaskFound}>
      <object data="/practise-no-overdue-task.svg" type="image/svg+xml" />
      <p>
        No overdue task left. Less overdue tasks increases your productivity.
      </p>
    </div>
  );
  return (
    <div>
      {Object.keys(overdueDates).map((iter: any, index: any) => {
        const allPendingTasks = getPendingTasks(
          overdueDates[iter],
          moment(iter)
        );
        return allPendingTasks.length > 0 ? (
          <div key={`practice-due-list-${index}`}>
            <div className={styles.title}>
              {moment(iter).format('YYYY-MM-DD')}
            </div>
            <PracticeTasksList
              tasks={getPendingTasks(overdueDates[iter], moment(iter))}
              filterDate={moment(iter)}
              onTaskAction={onTaskAction}
              loading={props.loading}
            />
          </div>
        ) : null;
      })}
      {!Object.keys(overdueDates).length && noOverdueTaskFound}
    </div>
  );
};

export default PracticeOverdue;
