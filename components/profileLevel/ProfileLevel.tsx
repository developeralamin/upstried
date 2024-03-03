import React from 'react';
import styles from './ProfileLevel.module.scss';

export interface ProfileLevelProps {
  stage: number;
  points: number;
  message: string;
}

const ProfileLevel: React.FC<ProfileLevelProps> = (
  props: ProfileLevelProps
) => {
  const { stage, points, message } = props;
  return (
    <div className={styles.ProfileLevel}>
      <h4>Level {stage}</h4>
      <h6>{points} Points</h6>
      <p>{message}</p>
    </div>
  );
};

export default ProfileLevel;
