import { Radio, RadioChangeEvent, Space } from 'antd';
import React from 'react';
import styles from './SurveyGender.module.scss';

interface SurveyGenderProps {
  value: string;
  onChangeHandler: (requested: string) => void;
}

const SurveyGender: React.FC<SurveyGenderProps> = (
  props: SurveyGenderProps
) => {
  const { value, onChangeHandler } = props;

  const onChange = (event: RadioChangeEvent) => {
    onChangeHandler(event.target.value);
  };

  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        <Radio className={styles.radio} value="Male">
          Male
        </Radio>
        <Radio className={styles.radio} value="Female">
          Female
        </Radio>
        <Radio className={styles.radio} value="Others">
          Others
        </Radio>
      </Space>
    </Radio.Group>
  );
};

export default SurveyGender;
