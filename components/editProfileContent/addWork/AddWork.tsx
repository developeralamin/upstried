import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { WorkplaceObj } from '../../../api/authors/dataTypes';
import WorkModal from '../workModal/WorkModal';
import styles from './AddWork.module.scss';

interface AddWorkProps {
  onAdd: (requested: WorkplaceObj) => void;
}

const AddWork: React.FC<AddWorkProps> = (props: AddWorkProps) => {
  const { onAdd } = props;

  const [visible, setVisible] = React.useState<boolean>(false);

  const openModal = () => {
    setVisible(true);
  };

  const onCancel = () => setVisible(false);

  const onSubmit = (values: WorkplaceObj) => {
    onAdd(values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        className={styles.button}
        type="text"
        size="small"
        onClick={openModal}
      >
        <PlusOutlined /> Add workplace
      </Button>
      <WorkModal visible={visible} onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
};

export default AddWork;
