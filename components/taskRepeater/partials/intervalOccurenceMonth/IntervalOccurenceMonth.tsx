import { Select } from 'antd';
import styles from './IntervalOccurenceMonth.module.scss';
export interface IntervalOccurrenceMonthProps {
  onSelect: any;
  selectedValues: any;
  maxLength?: number;
}

const IntervalOccurrenceMonth: React.FC<IntervalOccurrenceMonthProps> = (
  props
) => {
  return (
    <div className={styles.IntervalOccurrenceMonth}>
      {props.selectedValues.map((value: any, index: number) => {
        return (
          <Select
            placeholder="Select a day"
            className={styles.IntervalOccurenceValues}
            defaultValue={props.selectedValues[index]}
            key={index}
            onChange={(ev) => props.onSelect(ev, index)}
          >
            {
              // day one to day thirty loop
              Array(31)
                .fill(0)
                .map((_, i) => (
                  <Select.Option key={i} value={i + 1}>
                    Day {i + 1}
                  </Select.Option>
                ))
            }
          </Select>
        );
      })}
    </div>
  );
};

export default IntervalOccurrenceMonth;
