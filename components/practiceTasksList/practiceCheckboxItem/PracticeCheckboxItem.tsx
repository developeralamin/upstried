/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import clsx from 'clsx';
import moment from 'moment';
import React, { useState } from 'react';
import { TimelineTaskObj } from '../../../api/tasks/dataTypes';
import { DONE, FAILED, PENDING, SKIPPED } from '../../../config/constants';
import { updateTimeTaskCompleteInterface } from '../../../interfaces/practice.interface';
import { isTimeOver } from '../../../services/util';
import PracticeCheckboxAction from './PracticeCheckboxAction';
import styles from './PracticeCheckboxItem.module.scss';

interface PracticeCheckboxItemProps {
  taskId: any;
  timelineTask: TimelineTaskObj;
  onTaskAction: updateTimeTaskCompleteInterface;
  actionable: boolean;
}

const PracticeCheckboxItem: React.FC<PracticeCheckboxItemProps> = (
  props: PracticeCheckboxItemProps
) => {
  const { taskId, timelineTask, onTaskAction, actionable } = props;
  const [isHovered, setIsHovered] = useState(false);
  const completeTask = (status: any) => {
    onTaskAction(taskId, timelineTask.id, timelineTask.timelineStatus, status);
    setIsHovered(false);
  };

  return (
    <div
      onMouseLeave={() => setIsHovered(false)}
      className={clsx({
        [styles.PracticeCheckbox]: true,
        [styles.Hovered]: isHovered,
        [styles.PracticeDone]: timelineTask.timelineStatus === DONE,
        [styles.PracticeFailed]: timelineTask.timelineStatus === FAILED,
        [styles.PracticeSkipped]: timelineTask.timelineStatus === SKIPPED,
        [styles.PracticeDue]:
          timelineTask.timelineStatus === PENDING &&
          isTimeOver(timelineTask.dueDate),
        [styles.practiceUpcoming]: !actionable,
      })}
      onClick={(e: React.MouseEvent) => e.stopPropagation()}
    >
      {isHovered ? (
        <PracticeCheckboxAction
          timeline={timelineTask}
          onAction={completeTask}
        />
      ) : (
        <div
          onMouseOver={() =>
            actionable && timelineTask.timelineStatus === PENDING
              ? setIsHovered(true)
              : null
          }
          style={{ cursor: 'pointer' }}
          onClick={() =>
            timelineTask.timelineStatus && actionable ? completeTask(0) : null
          }
        >
          <div className={styles.StatusIcon}>
            {timelineTask.timelineStatus === PENDING ? (
              <img src="/practice/status-default-icon.svg" alt="icon" />
            ) : null}
            {timelineTask.timelineStatus === DONE ? (
              <img src="/practice/status-done-icon.svg" alt="icon" />
            ) : null}
            {timelineTask.timelineStatus === FAILED ? (
              <img src="/practice/status-failed-icon.svg" alt="icon" />
            ) : null}
            {timelineTask.timelineStatus === SKIPPED ? (
              <img src="/practice/status-skipped-icon.svg" alt="icon" />
            ) : null}
          </div>
        </div>
      )}
      <div>{timelineTask.label}</div>
    </div>
  );
};

export default PracticeCheckboxItem;
