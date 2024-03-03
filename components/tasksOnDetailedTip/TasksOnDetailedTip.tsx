import styles from './TasksOnDetailedTip.module.scss';
import TaskLists from '../TasksLists/TasksLists';
export interface TasksOnDetailedTipProps {
  tasks: any;
}

const TasksOnDetailedTip: React.FC<TasksOnDetailedTipProps> = (props) => {
  return (
    <div className={styles.TasksOnDetailedTip}>
      <div className={styles.Title}>
        <h1>{props.tasks.length}</h1>
        <span>{props.tasks.length > 1 ? 'Tasks' : 'Task'}</span>
        <div className="bar"></div>
      </div>
      <TaskLists tasks={props.tasks} />
    </div>
  );
};

export default TasksOnDetailedTip;
