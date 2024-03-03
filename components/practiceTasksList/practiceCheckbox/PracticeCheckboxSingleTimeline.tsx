import { Checkbox, Popconfirm, Popover, Tooltip } from 'antd';
import React from 'react';
import { TimelineTaskObj } from '../../../api/tasks/dataTypes';
import { PENDING } from '../../../config/constants';
import PracticeCheckboxAction from '../practiceCheckboxItem/PracticeCheckboxAction';
import styles from './PracticeCheckbox.module.scss';

interface PracticeCheckboxSingleTimelineProps {
  timeline: TimelineTaskObj;
  onTaskActionDone: any;
  taskId: any;
  isVisible: boolean;
  setIsDropdownVisible: any;
  checkActionable: (
    timelineLists: TimelineTaskObj[],
    timeline: TimelineTaskObj
  ) => boolean;
}

const PracticeCheckboxSingleTimeline: React.FC<
  PracticeCheckboxSingleTimelineProps
> = (props: PracticeCheckboxSingleTimelineProps) => {
  const {
    timeline,
    isVisible,
    onTaskActionDone,
    taskId,
    setIsDropdownVisible,
    checkActionable,
  } = props;

  const onAction = (timeLineStatus: number) =>
    onTaskActionDone(
      taskId,
      timeline.id,
      timeline.timelineStatus,
      timeLineStatus
    );

  const SingleTimeLineOption = (
    <div className={styles.SingleTimelineOption}>
      <PracticeCheckboxAction
        className={styles.SingleTimelineOptionPadding}
        timeline={timeline}
        onAction={onAction}
        isDisabled={!checkActionable([timeline], timeline)}
      />
    </div>
  );

  return (
    <div>
      {timeline.timelineStatus === PENDING ? (
        <Popover
          content={SingleTimeLineOption}
          trigger="click"
          visible={isVisible}
          overlayClassName={styles.CheckboxSinglePopover}
        >
          <Checkbox
            onClick={() => setIsDropdownVisible(!isVisible)}
            checked={false}
          />
        </Popover>
      ) : (
        <Popconfirm
          title="Do you want to undo this task?"
          onConfirm={() => onAction(PENDING)}
          okText="Yes"
          cancelText="No"
        >
          <Checkbox
            onClick={() => setIsDropdownVisible(!isVisible)}
            checked={true}
          />
        </Popconfirm>
      )}
    </div>
  );
};

export default PracticeCheckboxSingleTimeline;
