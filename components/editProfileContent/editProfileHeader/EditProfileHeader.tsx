import React from 'react';
import { ProfileObj } from '../../../api/profile/dataTypes';
import EditProfilePic from '../editProfilePic/EditProfilePic';
import styles from './EditProfileHeader.module.scss';

interface EditProfileProps {
  profile: ProfileObj;
  onProfileChange: (requested: Partial<ProfileObj>) => void;
}

const EditProfileHeader: React.FC<EditProfileProps> = (
  props: EditProfileProps
) => {
  const { profile, onProfileChange } = props;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <EditProfilePic
          profile={profile}
          avatar={profile.avatar}
          setAvatar={(requested: string) =>
            onProfileChange({ avatar: requested })
          }
        />
      </div>
      <div className={styles.right}>
        <div className={styles.name}>{profile.name}</div>
        {profile.profession !== '' && (
          <div className={styles.profession}>{profile.profession}</div>
        )}
        <div>
          <a className={styles.link} href={`/authors/${profile?.username}`}>
            Back To Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default EditProfileHeader;
