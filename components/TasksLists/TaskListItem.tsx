import { Tooltip } from 'antd';
import React from 'react';
import { isAuthenticated } from '../../services/authentication';
import AttachmentToolbar from '../attachmentToolbar/AttachmentToolbar';
import styles from './TasksLists.module.scss';
export interface TaskListItemProps {
  task: any;
}

const TaskListItem: React.FC<TaskListItemProps> = (props) => {
  return (
    <div className={styles.TaskListItem}>
      <div className={styles.Top}>
        <h2 className={styles.Title}>{props.task.title}</h2>
        <Tooltip title={props.task.repetition.longForm}>
          <p className={styles.Repeat}>{props.task.repetition.shortForm}</p>
        </Tooltip>
      </div>
      {isAuthenticated() ? (
        <AttachmentToolbar attachments={props.task.attachments} />
      ) : null}
    </div>
  );
};

export default TaskListItem;
