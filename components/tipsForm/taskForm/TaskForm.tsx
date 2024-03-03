import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputError from '../../inputError/InputError';
import TaskRepeater from '../../taskRepeater/TaskRepeater';
import RepeaterToText from '../../../services/repeaterToText';
import styles from './TaskForm.module.scss';
import TipsLinkAndAttachUploader from '../tipsLinkAndAttachUploader/TipsLinkAndAttachUploader';
import { TaskFormProps, UserInputInterface } from './TaskForm.d';
import { TaskRepeaterInterface } from '../../../interfaces/task.interface';
import clsx from 'clsx';
import {
  LinkAttachInterface,
  LinkAttachInterfaceWithIndex,
} from '../../../interfaces/attachment.interface';
import AttachmentToolbar from '../../attachmentToolbar/AttachmentToolbar';

const INITIAL_REPEATER_INPUT: any = {
  type: 'once',
  recurrence: {
    interval: {
      value: 0,
      unit: '',
    },
    intervalOccurence: {
      count: 0,
      values: [],
    },
    dailyOccurence: {
      count: 0,
      values: [],
    },
    duration: {
      value: 0,
      unit: '',
    },
  },
};

const INITIAL_USER_INPUT: UserInputInterface = {
  id: uuidv4(),
  title: '',
  attachments: [],
  repeater: INITIAL_REPEATER_INPUT,
  repetition: {
    shortForm: 'Once',
    longForm: 'Once',
  },
};

const INITIAL_ERRORS = {
  title: '',
  attachment: '',
};

const TaskForm: React.FC<TaskFormProps> = (props) => {
  const [userInput, setUserInput] =
    useState<UserInputInterface>(INITIAL_USER_INPUT);
  const [error, setError] = useState(INITIAL_ERRORS);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [taskFormVisible, setTaskFormVisible] = useState(false);

  const onTaskRepeaterCancel = () => {
    setUserInput({
      ...userInput,
      repeater: INITIAL_REPEATER_INPUT,
    });
  };

  const taskRepeaterOnUpdate = (taskRepeater: TaskRepeaterInterface) => {
    const repeater = new RepeaterToText(taskRepeater);
    setUserInput({
      ...userInput,
      repeater: taskRepeater,
      repetition: {
        shortForm: repeater.toShort(),
        longForm: repeater.toLong(),
      },
    });
  };

  const resetTask = () => {
    setUserInput(INITIAL_USER_INPUT);
    setError(INITIAL_ERRORS);
    setTaskFormVisible(false);
    props.onAddTaskVisibilityChange(false);
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setIsTitleFocused(true);
      setError((prevErrors) => ({
        ...prevErrors,
        title: '',
      }));
    } else {
      setIsTitleFocused(false);
    }
    setUserInput((prevUserInput: any) => ({
      ...prevUserInput,
      title: event.target.value,
    }));
  };

  const addTaskHandler = () => {
    setError(INITIAL_ERRORS);

    if (userInput.title === '') {
      setError((prevErrors) => ({
        ...prevErrors,
        title: 'Please enter task title',
      }));
      return;
    }

    if (userInput.title.length > 1200) {
      setError((prevError) => ({
        ...prevError,
        title: 'Title should not be over 1200 characters',
      }));
      return;
    }
    let taskRepeater: any = { type: userInput.repeater.type };
    if (userInput.repeater.type !== 'once' && userInput.repeater.recurrence) {
      taskRepeater = {
        ...taskRepeater,
        recurrence: userInput.repeater.recurrence,
      };
    }
    const requestedData = { ...userInput, repeater: taskRepeater } as any;
    props.onCreated(requestedData);
    message.success('Task added');

    setUserInput({
      ...INITIAL_USER_INPUT,
      id: uuidv4(),
      attachments: [],
    });
  };

  const onChangeAttachAndLink = (attachments: Array<LinkAttachInterface>) => {
    setUserInput((prevUserInput: UserInputInterface) => ({
      ...prevUserInput,
      attachments: [...prevUserInput.attachments, ...attachments],
    }));
  };

  const openTaskForm = () => {
    setUserInput({
      ...INITIAL_USER_INPUT,
      id: uuidv4(),
      attachments: [],
    });
    setTaskFormVisible(true);
    props.onAddTaskVisibilityChange(true);
  };

  const onTaskAttachmentRemove = (
    removedTask: LinkAttachInterfaceWithIndex
  ) => {
    const updatedAttachments = [...userInput.attachments].filter(
      (attachment: LinkAttachInterfaceWithIndex) =>
        removedTask.uuid !== attachment.uuid
    );
    setUserInput((prevUserInput: UserInputInterface) => ({
      ...prevUserInput,
      attachments: updatedAttachments,
    }));
  };

  const TaskFormContent = (
    <div className={styles.AddNewTask}>
      <div className={styles.Header}>
        <div className={styles.HeaderTop}>
          <Input.TextArea
            autoSize
            className={styles.TitleInput}
            placeholder="Write your task and enter"
            onChange={(ev: any) => onTitleChange(ev)}
            onPressEnter={addTaskHandler}
            value={userInput.title}
          />
        </div>
        <div className={styles.HeaderBottom}>
          <div className={styles.Left}>
            <div>{userInput.repetition.shortForm}</div>
            <AttachmentToolbar
              onRemove={onTaskAttachmentRemove}
              isEditMode={true}
              attachments={userInput.attachments}
            />
          </div>
          <div className={styles.Right}>
            <TipsLinkAndAttachUploader onChange={onChangeAttachAndLink} />
            <TaskRepeater
              onCancel={onTaskRepeaterCancel}
              onUpdate={taskRepeaterOnUpdate}
              repeater={userInput.repeater}
              notificationOn={false}
            />
          </div>
        </div>
      </div>
      {error.title && <InputError errorMessage={error.title} />}
      {error.attachment && <InputError errorMessage={error.attachment} />}
      <div className={styles.Footer}>
        <Button
          onClick={addTaskHandler}
          className={clsx(styles.btnAddTask, isTitleFocused && styles.Focused)}
        >
          {props.submitLabel}
        </Button>
        <Button onClick={resetTask} className={styles.btnResetTask}>
          Cancel
        </Button>
      </div>
    </div>
  );
  return (
    <div className={styles.TaskForm}>
      {taskFormVisible &&
        props.addTaskVisibility &&
        !props.taskEditMode &&
        TaskFormContent}
      {(!props.addTaskVisibility || props.taskEditMode) && (
        <Button onClick={openTaskForm} className={styles.btnContentOpener}>
          + Add Task
        </Button>
      )}
    </div>
  );
};

export default TaskForm;
