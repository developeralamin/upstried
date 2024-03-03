import { Button, message, Modal } from 'antd';
import React from 'react';
import { ProfileObj } from '../../../api/profile/dataTypes';
import ProfileAPI from '../../../api/profile/request';
import SurveyCategories from '../../survey/surveyCategories/SurveyCategories';
import styles from './PreferencesByInterest.module.scss';

interface PreferencesByInterestProps {
  profile: ProfileObj;
  onProfileChange: (requested: Partial<ProfileObj>) => void;
}

const PreferencesByInterest: React.FC<PreferencesByInterestProps> = (props: PreferencesByInterestProps) => {
  const { profile, onProfileChange } = props;
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [profileObj, setProfileObj] = React.useState<any>(null)

  React.useEffect(() => {
    setProfileObj({...profile})
  }, []);


  const closeModal = () => setIsVisible(false);

  const onChangeHandler = (requested: any) => {
    setProfileObj({...profileObj, interests: requested})
  }

  const onUpdateInterest = async () => {
    await new ProfileAPI().updateProfile(profileObj);
    message.success('Interests are updated');
    onProfileChange(profileObj);
    setIsVisible(false)
  }

  return (
    <div className={styles.interestPrefContainer}>
      <div className={styles.content}>
        <div>
          <div className={styles.subheader}>Tips preferred by Interest</div>
          <div className={styles.paragraph}>
            Customize your favourite category of tips to see on your home feed
          </div>
        </div>
        <div>
          <Button
            className={styles.cancel}
            type="text"
            onClick={() => setIsVisible(true)}
          >
            Change
          </Button>
        </div>
      </div>
      <Modal
        title="Survey"
        visible={isVisible}
        onCancel={closeModal}
        footer={null}
        className={styles.container}
      >
      {profileObj ? (<SurveyCategories categories={profileObj.interests} onChangeHandler={onChangeHandler} />) : null}
        <Button  
          className={styles.button}
          type="primary" onClick={onUpdateInterest}>Done</Button>
      </Modal>
    </div>
  );
};

export default PreferencesByInterest;
