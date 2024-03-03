import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { CategoryDataType } from '../../api/category/dataTypes';
import CategoryAPI from '../../api/category/request';
import { HTTP_SUCCESS_STATUS } from '../../config/api';
import TipsCreateForm from '../tipsForm/TipsForm';
import Modal, { ModalBody } from '../elements/modal/Modal';
import styles from './TipsCreate.module.scss';

const TipsCreate: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [categories, setCategories] = useState<CategoryDataType[]>([]);

  const getCategories = async () => {
    const categoriesResponse = await CategoryAPI.all();
    if (categoriesResponse.status === HTTP_SUCCESS_STATUS) {
      setCategories(categoriesResponse.data);
    }
  };

  useEffect(() => {
    if (modal) {
      getCategories();
    }
  }, [modal]);

  return (
    <div className={styles.TipsCreate}>
      <Button
        type="primary"
        className={styles.Toggler + ' theme-btn '}
        onClick={() => (modal ? setModal(false) : setModal(true))}
      >
        <img
          src="/topbar/plus.png"
          alt="Add Book"
          width="20"
          height="20"
          className={styles.CreateTipsIcon}
        />
        <span className={styles.CreateTipsLabel}>Add Book</span>
      </Button>

      <Modal
        modalHeaderTitle="Add Book"
        show={modal}
        onClose={() => setModal(false)}
      >
        <ModalBody>
          <TipsCreateForm
            onClose={() => setModal(false)}
            categories={categories.length > 0 ? categories : []}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default TipsCreate;
