import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, Tooltip } from 'antd';
import clsx from 'clsx';
import _ from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import TaskRepeater from '../../taskRepeater/TaskRepeater';
import RepeaterToText from '../../../services/repeaterToText';
import TipsLinkAndAttachUploader from '../tipsLinkAndAttachUploader/TipsLinkAndAttachUploader';
import styles from './Task.module.scss';
import { TaskProps } from './Task.d';
import { LinkAttachInterface, LinkAttachInterfaceWithIndex } from '../../../interfaces/attachment.interface';
import AttachmentToolbar from '../../attachmentToolbar/AttachmentToolbar';

const Task: React.FC<TaskProps> = (props) => {
  const [task, setTask] = useState({ ...props.task });
  useEffect(() => {
    setTask({ ...props.task });
  }, [props.task]);

  const onChangeTitle = (ev: any) => {
    setTask({ ...task, title: ev.target.value });
  };

  const onTaskAttachmentRemove = (attachment: LinkAttachInterfaceWithIndex) => {
    const taskAttachments = [...task.attachments];
    taskAttachments.splice(attachment.index, 1);
    setTask({
      ...task,
      attachments: taskAttachments,
    });
  };

  const onUpdateTask = () => {
    const repeater = new RepeaterToText(task.repeater);
    const repetition = {
      shortForm: repeater.toShort(),
      longForm: repeater.toLong(),
    };
    const finalTask = (({ editMode, ...t }) => t)(task);
    props.onUpdate({ ...finalTask, repetition });
    props.onEditModeChange(false);
  };

  const taskRepeaterOnUpdate = (taskRepeater: any) => {
    setTask({
      ...task,
      repeater: taskRepeater,
    });
  };

  const onChangeLinkAndAttach = (attachments: Array<LinkAttachInterface>) => {
    setTask({
      ...task,
      attachments: [...task.attachments, ...attachments],
    });
  };

  const Header = (
    <div className={styles.Header} onClick={() => props.onEditModeChange(task)}>
      <h6 className={styles.Title}> {task.title}</h6>
    </div>
  );

  const FormHeader = (
    <div className={styles.FormHeader}>
      <Input.TextArea
        autoSize
        onPressEnter={onUpdateTask}
        onChange={onChangeTitle}
        value={task.title}
      />
    </div>
  );

  return (
    <div
      className={clsx(styles.Task, task.editMode && styles.EditModeOn)}
    >
      <div className={styles.TaskContainer}>
        {task.editMode ? FormHeader : Header}
        <div className={styles.Footer}>
          <div className={styles.FooterLeft}>
            <Tooltip title={task.repetition.longForm}>
              <span className={styles.RepeaterStatus}>
                {task.repetition.shortForm}
              </span>
            </Tooltip>
            <AttachmentToolbar
              onRemove={onTaskAttachmentRemove}
              isEditMode={task.editMode}
              attachments={task.attachments}
            />
          </div>
          {task.editMode && (
            <div className={styles.EditableActions}>
              <TipsLinkAndAttachUploader
                onChange={onChangeLinkAndAttach}
              />
              <TaskRepeater
                onUpdate={taskRepeaterOnUpdate}
                repeater={task.repeater}
              />
            </div>
          )}
        </div>
      </div>
      {task.editMode && (
        <div className={styles.Actions}>
          <Button className={styles.BtnEditDone} onClick={onUpdateTask}>
            Save
          </Button>
          <Button onClick={() => props.onEditModeChange(false)} className={styles.BtnEditCancel}>
            Cancel
          </Button>
        </div>
      )}
      <Button
        className={styles.TaskDeleteBtn}
        onClick={() => props.onDelete(props.task.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </div>
  );
};

export default Task;
