import React, { useEffect } from 'react';
import { useState } from 'react';
import { TaskInterfaceWithEditMode } from '../../../interfaces/task.interface';
import Task from '../task/Task';
import styles from './Tasks.module.scss';
import { TaskListProps } from './Tasks.d';

const TaskList: React.FC<TaskListProps> = (props) => {
  const [tasks, setTasks] = useState<Array<TaskInterfaceWithEditMode>>([]);
  useEffect(() => {
    setInitialTasks();
  }, [props.tasks]);

  useEffect(() => {
    if (props.addTaskVisibility) {
      setInitialTasks();
    }
  }, [props]);

  const setInitialTasks = () => {
    setTasks(props.tasks.map((task) => ({
      ...task,
      editMode: false,
    })));
  };

  const onEditModeChangeHandler = (task: TaskInterfaceWithEditMode) => {
    setTasks(
      tasks.map((taskIter: TaskInterfaceWithEditMode) => ({
        ...taskIter,
        editMode: taskIter.id === task.id ? !taskIter.editMode : false,
      }))
    );
    props.onEditModeChange(task ? true : false);
  };

  return (
    <div className={styles.Tasks}>
      <h3 className={styles.Title}>Tasks</h3>
      {tasks.map((task: TaskInterfaceWithEditMode, index: number) => (
        <Task
          onEditModeChange={onEditModeChangeHandler}
          onUpdate={props.onUpdate}
          onDelete={props.onDelete}
          key={index}
          task={task}
        />
      ))}
    </div>
  );
};

export default TaskList;
