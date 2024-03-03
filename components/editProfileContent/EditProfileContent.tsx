import React from 'react';
import { ProfileObj } from '../../api/profile/dataTypes';
import EditProfileTabs from './editProfileTabs/EditProfileTabs';
import styles from './EditProfileContent.module.scss';

interface EditProfileContentProps {
  profile: ProfileObj;
  tab: any;
}

const EditProfileContent: React.FC<EditProfileContentProps> = (
  props: EditProfileContentProps
) => {
  const [profile, setProfile] = React.useState<ProfileObj>(props.profile);

  const onProfileChange = (requestedProfile: Partial<ProfileObj>) =>
    setProfile({ ...profile, ...requestedProfile });

  return (
    <div className={styles.container}>
      <EditProfileTabs profile={profile} tab={props.tab} onProfileChange={onProfileChange} />
    </div>
  );
};

export default EditProfileContent;
