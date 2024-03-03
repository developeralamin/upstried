import { message } from 'antd';
import React from 'react';
import { InterestObj } from '../../../api/survey/dataTypes';
import { InterestsAPI } from '../../../api/survey/request';
import styles from './SurveyCategories.module.scss';
import SurveyCategoryItem from './surveyCategoryItem/SurveyCategoryItem';

interface SurveyCategoriesProps {
  categories: string[];
  onChangeHandler: (requested: string[]) => void;
}

const SurveyCategories: React.FC<SurveyCategoriesProps> = (
  props: SurveyCategoriesProps
) => {
  const { categories, onChangeHandler } = props;

  const [items, setItems] = React.useState<InterestObj[]>([]);

  React.useEffect(() => {
    const fetchInterests = async () => {
      try {
        setItems(await new InterestsAPI().get());
      } catch (exception) {
        message.error('Request Failed !');
      }
    };
    fetchInterests();
  }, []);

  const onClick = (requested: string) => {
    if (categories.includes(requested)) {
      onChangeHandler(categories.filter((iter) => iter !== requested));
    } else {
      onChangeHandler([...categories, requested]);
    }
  };

  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <SurveyCategoryItem
          key={'survey_item_' + index}
          id={item.uuid}
          name={item.name}
          img={item.image}
          checked={categories.includes(item.uuid)}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default SurveyCategories;
