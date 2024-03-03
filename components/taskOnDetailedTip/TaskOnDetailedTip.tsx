import { getPhoto } from '../../services/util';
import styles from './TaskOnDetailedTip.module.scss';

export interface TaskOnDetailedTipProps {
  task: any;
}

const TaskOnDetailedTip: React.FC<TaskOnDetailedTipProps> = (props) => {
  return (
    <div className={styles.TaskOnDetailedTip}>
      <div className={styles.Left}>
        <figure>
          <img
            src={
              getPhoto(props.task.attachment) ||
              'https://via.placeholder.com/450x250'
            }
            alt="Sample"
            width="100%"
          />
        </figure>
      </div>
      <div className={styles.Right}>
        <h4 className={styles.Title}>{props.task.title}</h4>
        <p className={styles.Description}>{props.task.description}</p>
      </div>
    </div>
  );
};

export default TaskOnDetailedTip;
