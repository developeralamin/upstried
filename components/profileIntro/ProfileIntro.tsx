/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar } from 'antd';
import React from 'react';
import { ProfileObj } from '../../api/profile/dataTypes';
import styles from './ProfileIntro.module.scss';

export interface ProfileIntroProps {
  profile?: ProfileObj | null;
}

const ProfileIntro: React.FC<ProfileIntroProps> = (
  props: ProfileIntroProps
) => {
  const { profile } = props;
  return (
    <>
      <div className={styles.ProfileIntro}>
        <div className={styles.TopLeft}>
          <div className={styles.ProfilePhoto}>
            <Avatar size={70} src={profile?.avatar}>
              {profile?.name[0]}
            </Avatar>
          </div>
        </div>
        <div className={styles.TopRight}>
          <div className={styles.ProfileEdit}>
            <h5 className={styles.Name}>{profile?.name || ''}</h5>
            <p className={styles.Email}>{profile?.email || ''}</p>
            <a href={`/authors/${profile?.username}`}>
              <span className={styles.EditProfile}>View Profile</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileIntro;
