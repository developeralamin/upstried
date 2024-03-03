import { DatePicker } from 'antd';
import styles from './IntervalOccurenceYear.module.scss';
import moment from 'moment';
export interface IntervalOccurrenceYearProps {
  onSelect: any;
  selectedValues: any;
  maxLength?: number;
}
const IntervalOccurrenceYear: React.FC<IntervalOccurrenceYearProps> = (
  props
) => {
  const format = 'DD/MM';
  return (
    <div className={styles.IntervalOccurrenceYear}>
      {props.selectedValues.map((value: any, index: number) => {
        const defaultDate = moment(props.selectedValues[index], format);
        return (
          <DatePicker
            className={styles.Item}
            picker="date"
            key={index}
            format={format}
            defaultValue={defaultDate}
            onChange={(ev) => props.onSelect(ev, index)}
          />
        );
      })}
    </div>
  );
};

export default IntervalOccurrenceYear;
