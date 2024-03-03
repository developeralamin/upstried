/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { TaskObj } from '../../api/tasks/dataTypes';
import { updateTimeTaskCompleteInterface } from '../../interfaces/practice.interface';
import { filterTimelines } from '../../services/TaskFilter';
import PracticeTaskItem from './practiceTaskItem/PracticeTaskItem';
import './PracticeTasksList.module.scss';
import styles from './PracticeTasksList.module.scss';

interface PracticeTasksListProps {
  tasks: TaskObj[];
  filterDate: moment.Moment;
  onTaskAction: updateTimeTaskCompleteInterface;
  loading: boolean;
}

const PracticeTasksList: React.FC<PracticeTasksListProps> = (
  props: PracticeTasksListProps
) => {
  const { tasks, filterDate, onTaskAction, loading } = props;

  if (tasks.length == 0) {
    return (
      <div className={styles.noTaskFound}>
        <object data="/practise-no-task.svg" type="image/svg+xml" />
        <p>
          No task left for today. Stay healthy, stay productive. See you
          tomorrow.
        </p>
      </div>
    );
  }

  const pendingTasks = tasks.filter((task: any) => {
    const pendingTimelines = filterTimelines(task.timeline, filterDate, [0]);
    return pendingTimelines.length > 0;
  });

  const completedTasks = tasks.filter((task: any) => {
    const completedTimelines = filterTimelines(
      task.timeline,
      filterDate,
      [1, 2, 3]
    );
    return completedTimelines.length === task.timeline.length;
  });

  return (
    <div>
      {pendingTasks.map((iter, index) => (
        <PracticeTaskItem
          loading={loading}
          task={iter}
          key={`practice-task-${index}`}
          filterDate={filterDate}
          isComplete={false}
          onTaskAction={onTaskAction}
        />
      ))}
      {completedTasks.length > 0 && (
        <div className={styles.title}>Completed</div>
      )}
      {completedTasks.length > 0 &&
        completedTasks.map((iter, index) => (
          <PracticeTaskItem
            loading={loading}
            task={iter}
            key={`practice-task-${index}`}
            filterDate={filterDate}
            isComplete={true}
            onTaskAction={onTaskAction}
          />
        ))}
    </div>
  );
};

export default PracticeTasksList;
