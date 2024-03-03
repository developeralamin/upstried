import { Avatar } from 'antd';
import React from 'react';
import { ProfileObj } from '../../../api/profile/dataTypes';
import ProfileAPI from '../../../api/profile/request';
import styles from './SurveyWelcome.module.scss';

const SurveyWelcome: React.FC = () => {
  const [profile, setProfile] = React.useState<ProfileObj | null>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      setProfile(await new ProfileAPI().get());
    };

    fetchProfile();
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <Avatar
          className={styles.avatar}
          src={profile?.avatar || null}
          size="large"
        >
          {profile?.name.substring(0, 1)}
        </Avatar>
      </div>
      <div className={styles.email}>{profile?.email}</div>
      <div className={styles.title}>Welcome to Virtunus</div>
      <div className={styles.subtitle}>{profile?.name}</div>
      <div className={styles.paragraph}>
        Your answers to the next few questions will help us find the right tips
        for you.
      </div>
    </div>
  );
};

export default SurveyWelcome;
