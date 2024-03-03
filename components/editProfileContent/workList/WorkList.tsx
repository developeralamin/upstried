import { Button, List } from 'antd';
import lodash from 'lodash';
import moment from 'moment';
import React from 'react';
import { WorkplaceObj } from '../../../api/authors/dataTypes';
import WorkModal from '../workModal/WorkModal';
import styles from './WorkList.module.scss';

interface WorkListProps {
  workplaces: WorkplaceObj[];
  updateWorkplace: (requested: WorkplaceObj, index: number) => void;
  removeWorkplace: (requested: number) => void;
}

const WorkList: React.FC<WorkListProps> = (props: WorkListProps) => {
  const { workplaces, updateWorkplace, removeWorkplace } = props;

  const [visible, setVisible] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);

  const editWorkplace = (requestedIndex: number) => {
    setIndex(requestedIndex);
    setVisible(true);
  };

  return (
    <div>
      {workplaces.length > 0 && (
        <List
          itemLayout="horizontal"
          className={styles.list}
          dataSource={lodash.sortBy(
            workplaces,
            [
              (iter) => moment(iter.start).toDate(),
              (iter) => moment(iter.end).toDate(),
            ],
            ['asc', 'asc']
          )}
          renderItem={(item, index) => (
            <List.Item
              className={styles.item}
              actions={[
                <Button
                  type="text"
                  shape="circle"
                  onClick={() => editWorkplace(index)}
                  key="list-edit"
                >
                  Edit
                </Button>,
                <Button
                  type="text"
                  shape="circle"
                  onClick={() => removeWorkplace(index)}
                  key="list-edit"
                >
                  Delete
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={item.position}
                description={
                  <React.Fragment>
                    <div>{item.workplace}</div>
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
        <WorkModal
          initial={workplaces[index]}
          visible={visible}
          onSubmit={(requested) => {
            updateWorkplace(requested, index);
            setVisible(false);
          }}
          onCancel={() => setVisible(false)}
        />
      )}
    </div>
  );
};

export default WorkList;
