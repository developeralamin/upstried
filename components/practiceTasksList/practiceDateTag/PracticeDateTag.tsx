import clsx from 'clsx';
import React from 'react';
import { TimelineTaskObj } from '../../../api/tasks/dataTypes';
import { DONE, FAILED, PENDING, SKIPPED } from '../../../config/constants';
import { isTimeOver } from '../../../services/util';
import styles from './PracticeDateTag.module.scss';
import { Tooltip } from 'antd';

interface PracticeDateTagProps {
  actionable: boolean;
  timelineTask: TimelineTaskObj;
  isComplete: boolean;
}

const PracticeDateTag: React.FC<PracticeDateTagProps> = (
  props: PracticeDateTagProps
) => {
  const { timelineTask, actionable, isComplete } = props;
  const isDue = () =>
    timelineTask.timelineStatus === PENDING && isTimeOver(timelineTask.dueDate);
  const isUpcoming = () => actionable === false;

  const getCompletedAt = () => {
    return timelineTask.completedAt ? timelineTask.completedAt.fromNow() : null;
  };

  return (
    <div
      className={clsx({
        [styles.Practice_date_tag]: true,
        [styles.Practice_date_tag__done]: timelineTask.timelineStatus === DONE,
        [styles.Practice_date_tag__failed]:
          timelineTask.timelineStatus === FAILED,
        [styles.Practice_date_tag__skipped]:
          timelineTask.timelineStatus === SKIPPED,
        [styles.Practice_date_tag__due]: isDue(),
        [styles.Practice_date_tag__upcoming]: isUpcoming(),
        [styles.Practice_date_tag__active]:
          timelineTask.timelineStatus === PENDING && actionable,
      })}
    >
      {timelineTask.timelineStatus === DONE ? (
        <img
          src={
            isComplete
              ? '/practice/check-complete.svg'
              : '/practice/date-tag-check.svg'
          }
          alt="icon"
        />
      ) : null}
      {timelineTask.timelineStatus === FAILED ? (
        <img
          src={
            isComplete
              ? '/practice/failed-complete.svg'
              : '/practice/date-tag-failed.svg'
          }
          alt="icon"
        />
      ) : null}
      {timelineTask.timelineStatus === SKIPPED ? (
        <img
          src={
            isComplete
              ? '/practice/skip-complete.svg'
              : '/practice/date-tag-skip.svg'
          }
          alt="icon"
        />
      ) : null}
      {isDue() ? (
        <img
          src={
            isComplete
              ? '/practice/check-complete.svg'
              : '/practice/date-tag-overdue.svg'
          }
          alt="icon"
        />
      ) : null}

      <Tooltip title={getCompletedAt()}>{timelineTask.label}</Tooltip>
    </div>
  );
};

export default PracticeDateTag;
