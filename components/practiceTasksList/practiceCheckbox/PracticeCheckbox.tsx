import { Checkbox } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { TimelineTaskObj } from '../../../api/tasks/dataTypes';
import { PENDING } from '../../../config/constants';
import { updateTimeTaskCompleteInterface } from '../../../interfaces/practice.interface';
import PracticeCheckboxItem from '../practiceCheckboxItem/PracticeCheckboxItem';
import styles from './PracticeCheckbox.module.scss';
import PracticeCheckboxSingleTimeline from './PracticeCheckboxSingleTimeline';

interface PracticeCheckboxProps {
  timelineList: TimelineTaskObj[];
  filterDate: moment.Moment;
  isComplete: boolean;
  onTaskAction: updateTimeTaskCompleteInterface;
  taskId: any;
  checkActionable: (
    timelineLists: TimelineTaskObj[],
    timeline: TimelineTaskObj
  ) => boolean;
}

const PracticeCheckbox: React.FC<PracticeCheckboxProps> = (
  props: PracticeCheckboxProps
) => {
  const { timelineList, checkActionable, isComplete, onTaskAction, taskId } =
    props;
  const ref: any = useRef(null);
  const ref2: any = useRef(null);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref?.current?.contains(event.target)) {
      setIsDropdownVisible(false);
    }
    if (ref2.current && !ref2?.current?.contains(event.target)) {
      setTimeout(() => {
        setIsDropdownVisible(false);
      }, 200);
    }
  };

  const onTaskActionDone = (
    taskId: any,
    timelineId: any,
    prevStatus: any,
    timelineStatus: any
  ) => {
    onTaskAction(taskId, timelineId, prevStatus, timelineStatus);

    const pendingCount = timelineList.filter(
      (iter: any) => iter.timelineStatus === PENDING
    ).length;
    if (timelineStatus != PENDING && pendingCount === 1) {
      setIsDropdownVisible(false);
    }
    if (prevStatus != PENDING && pendingCount === 0) {
      setIsDropdownVisible(false);
    }
  };

  return (
    <div className={styles.PracticeCheckboxPanelWrapaer}>
      {timelineList.length === 1 ? (
        <div className={styles.SingleTimelineOptionParent} ref={ref2}>
          <PracticeCheckboxSingleTimeline
            timeline={timelineList[0]}
            isVisible={isDropdownVisible}
            onTaskActionDone={onTaskActionDone}
            setIsDropdownVisible={setIsDropdownVisible}
            taskId={taskId}
            checkActionable={checkActionable}
          />
        </div>
      ) : (
        <div>
          {isDropdownVisible ? (
            <div className={styles.PracticeCheckboxPanel} ref={ref}>
              {timelineList.map((iter, index) => (
                <PracticeCheckboxItem
                  taskId={taskId}
                  actionable={checkActionable(timelineList, iter)}
                  timelineTask={iter}
                  key={`practice-checkbox-item-${index}`}
                  onTaskAction={onTaskActionDone}
                />
              ))}
            </div>
          ) : null}
          <Checkbox
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
            checked={isComplete ? true : false}
          />
        </div>
      )}
    </div>
  );
};

export default PracticeCheckbox;
