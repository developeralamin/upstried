import { Tooltip } from 'antd';
import clsx from 'clsx';
import React from 'react';
import styles from './PracticeProgressBar.module.scss';

interface PracticeProgressBarProps {
  enrollmentStatus: string;
  progressStatus: any;
}

const PracticeProgressBar: React.FC<PracticeProgressBarProps> = (
  props: PracticeProgressBarProps
) => {
  const { progressStatus } = props;
  const total = progressStatus.total;

  const completionCount =
    progressStatus.done + progressStatus.failed + progressStatus.skipped;

  const done = Math.round((progressStatus.done / total) * 100) + '%';
  const failed = Math.round((progressStatus.failed / total) * 100) + '%';
  const skipped = Math.round((progressStatus.skipped / total) * 100) + '%';
  return (
    <div
      className={clsx(
        styles.container,
        props.enrollmentStatus === 'incomplete'
          ? styles.colorIncomplete
          : styles.colorDefault
      )}
    >
      <div className={styles['title-container']}>
        <div className={styles.title}>Accomplishment </div>
        <div className={styles.progress}>
          {Math.ceil((completionCount / total) * 100)}%
        </div>
      </div>
      <div className={styles.Progressbar}>
        <Tooltip title={done}>
          <div style={{ width: done }} className={styles.ProgressDone}></div>
        </Tooltip>
        <Tooltip title={failed}>
          <div
            style={{ width: failed }}
            className={styles.ProgressFailed}
          ></div>
        </Tooltip>
        <Tooltip title={skipped}>
          <div
            style={{ width: skipped }}
            className={styles.ProgressSkipped}
          ></div>
        </Tooltip>
      </div>
    </div>
  );
};

export default PracticeProgressBar;
