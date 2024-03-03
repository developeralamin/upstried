import { CheckCircleFilled } from '@ant-design/icons';
import { Card, Checkbox } from 'antd';
import clsx from 'clsx';
import React from 'react';
import styles from './SurveyCategoryItem.module.scss';

interface SurveyCategoryItemProps {
  id: string;
  name: string;
  checked: boolean;
  img: string;
  onClick: (requested: string) => void;
}

const SurveyCategoryItem: React.FC<SurveyCategoryItemProps> = (
  props: SurveyCategoryItemProps
) => {
  const { id, checked, name, img, onClick } = props;

  const handleClick = () => onClick(id);

  return (
    <Card
      className={clsx({ [styles.container]: true, [styles.selected]: checked })}
      hoverable
      onClick={handleClick}
      cover={<img alt="" src={img} />}
      bordered={false}
    >
      {checked && (
        <div className={styles.checkbox}>
          <span className={styles.iconwrapper}>
            <i className='icon-Vector-12-Stroke'></i>
          </span>
        </div>
      )}
      <h5 className={styles.label}>{name}</h5>
    </Card>
  );
};

export default SurveyCategoryItem;
