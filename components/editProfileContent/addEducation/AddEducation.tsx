import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import React from 'react';
import { EducationObj } from '../../../api/authors/dataTypes';
import EducationModal from '../educationModal/EducationModal';
import styles from './AddEducation.module.scss';

interface AddEducationProps {
  onAdd: (requested: EducationObj) => void;
}

const AddEducation: React.FC<AddEducationProps> = (
  props: AddEducationProps
) => {
  const { onAdd } = props;
  const [visible, setVisible] = React.useState<boolean>(false);

  const openModal = () => {
    setVisible(true);
  };

  const onCancel = () => setVisible(false);

  const onSubmit = (values: EducationObj) => {
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
        <PlusOutlined /> Add Education
      </Button>
      <EducationModal
        visible={visible}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};

export default AddEducation;
