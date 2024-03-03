import TaskListItem from './TaskListItem';
import styles from './TasksLists.module.scss';
export interface TaskListsProps {
  tasks: Array<any>;
}

const TaskLists: React.FC<TaskListsProps> = (props) => {
  return (
    <div className={styles.TaskLists}>
      {props.tasks.map((task: any, index: number) => (
        <TaskListItem key={index} task={task} />
      ))}
    </div>
  );
};

export default TaskLists;
