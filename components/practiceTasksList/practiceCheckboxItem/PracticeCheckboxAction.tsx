import { Tooltip } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { TimelineTaskObj } from '../../../api/tasks/dataTypes';
import styles from './PracticeCheckboxItem.module.scss';

interface PracticeCheckboxActionProps {
  timeline: TimelineTaskObj;
  onAction: any;
  className?: string;
  isDisabled?: boolean;
}

const PracticeCheckboxAction = (props: PracticeCheckboxActionProps) => {
  const { timeline, onAction, className, isDisabled } = props;
  return (
    <div
      className={clsx(
        styles.PracticeActions,
        styles.PracticeActions_isHovered,
        isDisabled && styles.Disabled,
        className
      )}
    >
      <button
        className={clsx(
          styles.Done,
          timeline.timelineStatus === 1 && styles.Disable
        )}
        onClick={() => onAction(1)}
        disabled={isDisabled || timeline.timelineStatus === 1}
      >
        <Tooltip placement="top" title="Done">
          {timeline.timelineStatus === 1 ? (
            <img src="/practice/done-disable.svg" alt="icon" />
          ) : (
            <img src="/practice/done.svg" alt="icon" />
          )}
        </Tooltip>
      </button>
      <button
        className={clsx(
          styles.Fail,
          timeline.timelineStatus === 2 && styles.Disable
        )}
        onClick={() => onAction(2)}
        disabled={isDisabled || timeline.timelineStatus === 2}
      >
        <Tooltip placement="top" title="Failed">
          {timeline.timelineStatus === 2 ? (
            <img src="/practice/fail-disable.svg" alt="icon" />
          ) : (
            <img src="/practice/fail.svg" alt="icon" />
          )}
        </Tooltip>
      </button>
      <button
        className={clsx(
          styles.Skip,
          timeline.timelineStatus === 3 && styles.Disable
        )}
        onClick={() => onAction(3)}
        disabled={isDisabled || timeline.timelineStatus === 3}
      >
        <Tooltip placement="top" title="Skip">
          {timeline.timelineStatus === 3 ? (
            <img src="/practice/skip-disable.svg" alt="icon" />
          ) : (
            <img src="/practice/skip.svg" alt="icon" />
          )}
        </Tooltip>
      </button>
    </div>
  );
};

export default PracticeCheckboxAction;
