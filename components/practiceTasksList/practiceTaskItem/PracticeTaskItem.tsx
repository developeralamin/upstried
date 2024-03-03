import { Progress } from 'antd';
import clsx from 'clsx';
import lodash from 'lodash';
import moment from 'moment';
import React from 'react';
import { TaskObj, TimelineTaskObj } from '../../../api/tasks/dataTypes';
import { PENDING } from '../../../config/constants';
import { updateTimeTaskCompleteInterface } from '../../../interfaces/practice.interface';
import AttachmentToolbar from '../../attachmentToolbar/AttachmentToolbar';
import PracticeCheckbox from '../practiceCheckbox/PracticeCheckbox';
import PracticeDateTag from '../practiceDateTag/PracticeDateTag';
import styles from './PracticeTaskItem.module.scss';
// import {} from '.'
interface PracticeTaskItemProps {
  task: any;
  filterDate: moment.Moment;
  isComplete: boolean;
  onTaskAction: updateTimeTaskCompleteInterface;
  loading: boolean;
}
const PracticeTaskItem: React.FC<PracticeTaskItemProps> = (
  props: PracticeTaskItemProps
) => {
  const { task, filterDate, isComplete, onTaskAction } = props;
  const timelineList = task.timeline;

  const pendingCounts = timelineList.filter(
    (iter:any) => iter.timelineStatus == PENDING
  ).length;

  const totalCounts = timelineList.length;
  const completedCounts = totalCounts - pendingCounts;

  const checkPendingTimelineInBetween = (
    timeList: TimelineTaskObj[],
    from: moment.Moment,
    to: moment.Moment
  ) =>
    timeList.filter((timeline: TimelineTaskObj) => {
      if (timeline.timelineStatus !== PENDING) {
        return false;
      }
      if (!timeline.dueDate) {
        return true;
      }
      return (
        from.isBefore(timeline.dueDate, 'minute') &&
        to.isAfter(timeline.dueDate, 'minute')
      );
    }).length > 0;

  const checkActionable = (
    timeList: TimelineTaskObj[],
    timeline: TimelineTaskObj
  ) => {
    //future date
    if (timeline.startDate.isAfter(moment(), 'day')) {
      return false;
    }
    // Once
    if (!timeline.dueDate || timeline.timelineStatus !== PENDING) {
      return true;
    }
    //time passed
    if (timeline.dueDate.isBefore(moment(), 'second')) {
      return true;
    }
    //One time in a interval
    if (timeList.length == 1) {
      return true;
    }

    return !checkPendingTimelineInBetween(timeList, moment(), timeline.dueDate);
  };
  return (
    <div className={clsx(styles.container, isComplete && styles.CompletedItem)}>
      <div className={styles.checkbox}>
        <PracticeCheckbox
          isComplete={isComplete}
          timelineList={timelineList}
          filterDate={filterDate}
          onTaskAction={onTaskAction}
          taskId={task.id}
          checkActionable={checkActionable}
        />
      </div>
      <div className={styles.body}>
        <div
          className={clsx({
            [styles.cross]:
              isComplete && completedCounts && completedCounts === totalCounts,
          })}
        >
          {task.title}
        </div>
        <div
          className={clsx({
            ['practice-dates']: true,
          })}
        >
          {timelineList.map((iter:any, index:any) => (
            <PracticeDateTag
              isComplete={isComplete}
              key={'practice-date-tage-' + index}
              timelineTask={iter}
              actionable={checkActionable(timelineList, iter)}
            />
          ))}
        </div>
        <div className={styles.attachments}>
          <AttachmentToolbar attachments={task.attachments} />
        </div>
      </div>
      {isComplete && completedCounts && completedCounts === totalCounts ? (
        <div className={styles.completed}>Completed</div>
      ) : (
        <div className={styles.progress}>
          <div>
            {completedCounts}/{totalCounts} Completed
          </div>
          <div>
            <Progress
              percent={(completedCounts / totalCounts) * 100}
              showInfo={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticeTaskItem;
