import { message, Modal } from 'antd';
import React from 'react';
import { AuthorObj } from '../../api/authors/dataTypes';
import ProfileAPI from '../../api/profile/request';
import { isAuthenticated } from '../../services/authentication';
import styles from './Survey.module.scss';
import SurveyForm from './surveyForm/SurveyForm';

interface SurveyProps {
  profile: AuthorObj;
}

const Survey: React.FC<SurveyProps> = (props) => {
  const profile: AuthorObj = props.profile;
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    profile?.isSurveyRequired && setIsVisible(true);
  }, [profile]);

  const closeModal = () => setIsVisible(false);

  return (
    <Modal
      title="Survey"
      visible={isVisible}
      onCancel={closeModal}
      footer={null}
      className={styles.container}
    >
      <SurveyForm postSubmitHandler={closeModal} />
    </Modal>
  );
};

export default Survey;
