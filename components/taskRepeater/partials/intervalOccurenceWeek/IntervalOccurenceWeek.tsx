import styles from './IntervalOccurenceWeek.module.scss';

export interface TaskRepeaterProps {
  onSelect: (date: any) => void;
  selectedValues: any;
  maxLength: number;
}

const IntervalOccurrenceWeek: React.FC<TaskRepeaterProps> = (props) => {
  const onSelect = (day: number) => {
    props.onSelect(day);
  };
  return (
    <div className={styles.IntervalOccurrenceWeek}>
      <div
        onClick={() => onSelect(1)}
        className={
          styles.Item +
          ' ' +
          (props.selectedValues.includes(1) ? styles.Active : '')
        }
      >
        M
      </div>
      <div
        onClick={() => onSelect(2)}
        className={
          styles.Item +
          ' ' +
          (props.selectedValues.includes(2) ? styles.Active : '')
        }
      >
        T
      </div>
      <div
        onClick={() => onSelect(3)}
        className={
          styles.Item +
          ' ' +
          (props.selectedValues.includes(3) ? styles.Active : '')
        }
      >
        W
      </div>
      <div
        onClick={() => onSelect(4)}
        className={
          styles.Item +
          ' ' +
          (props.selectedValues.includes(4) ? styles.Active : '')
        }
      >
        T
      </div>
      <div
        onClick={() => onSelect(5)}
        className={
          styles.Item +
          ' ' +
          (props.selectedValues.includes(5) ? styles.Active : '')
        }
      >
        F
      </div>
      <div
        onClick={() => onSelect(6)}
        className={
          styles.Item +
          ' ' +
          (props.selectedValues.includes(6) ? styles.Active : '')
        }
      >
        S
      </div>
      <div
        onClick={() => onSelect(0)}
        className={
          styles.Item +
          ' ' +
          (props.selectedValues.includes(0) ? styles.Active : '')
        }
      >
        S
      </div>
    </div>
  );
};

export default IntervalOccurrenceWeek;
