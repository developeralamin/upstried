import { Button, List } from 'antd';
import moment from 'moment';
import React from 'react';
import { EducationObj } from '../../../api/authors/dataTypes';
import EducationModal from '../educationModal/EducationModal';
import styles from './EducationList.module.scss';

interface EducationListProps {
  education: EducationObj[];
  updateEducation: (requested: EducationObj, index: number) => void;
  removeEducation: (requested: number) => void;
}

const EducationList: React.FC<EducationListProps> = (
  props: EducationListProps
) => {
  const { education, updateEducation, removeEducation } = props;
  const [visible, setVisible] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);

  const editEducation = (requestedIndex: number) => {
    setIndex(requestedIndex);
    setVisible(true);
  };

  return (
    <div>
      {education.length > 0 && (
        <List
          itemLayout="horizontal"
          className={styles.list}
          dataSource={education}
          renderItem={(item, index) => (
            <List.Item
              className={styles.item}
              actions={[
                <Button
                  type="text"
                  shape="circle"
                  onClick={() => editEducation(index)}
                  key="list-edit"
                >
                  Edit
                </Button>,
                <Button
                  type="text"
                  shape="circle"
                  onClick={() => removeEducation(index)}
                  key="list-delete"
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={item.degree}
                description={
                  <React.Fragment>
                    <div>{item.institution}</div>
                    <div className={styles.dates}>{`${moment(
                      item.start,
                      'MM-YYYY'
                    ).format('MMM, YY')} - ${
                      item.isPresent
                        ? 'present'
                        : moment(item.end, 'MM-YYYY').format('MMM, YY')
                    }`}</div>
                  </React.Fragment>
                }
              />
            </List.Item>
          )}
        />
      )}
      {visible && (
        <EducationModal
          initial={education[index]}
          visible={visible}
          onSubmit={(requested) => {
            updateEducation(requested, index);
            setVisible(false);
          }}
          onCancel={() => setVisible(false)}
        />
      )}
    </div>
  );
};

export default EducationList;
