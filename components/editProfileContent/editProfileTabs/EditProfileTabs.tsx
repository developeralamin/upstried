import React from 'react';
import { ProfileObj } from '../../../api/profile/dataTypes';
import { Tabs } from 'antd';
import EditProfileForm from '../editProfileForm/EditProfileForm';
import AccountSettingsForm from '../accountSettingsForm/AccountSettingsForm';
import SocialForm from '../socialForm/SocialForm';
import styles from './EditProfileTabs.module.scss';
import NotificationSettings from '../notificationSettings/NotificationSettings';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons';
import Preferences from '../preferences/Preferences';
import BlockAuthorList from '../../blockAuthorList/BlockAuthorList';

interface EditProfileTabsProps {
  profile: ProfileObj;
  onProfileChange: (requested: Partial<ProfileObj>) => void;
  tab: string;
}

const EditProfileTabs: React.FC<EditProfileTabsProps> = (
  props: EditProfileTabsProps
) => {
  const { profile, onProfileChange } = props;

  const [visible, setVisible] = React.useState<boolean>(false);

  const toggleMenu = () => {
    setVisible(!visible);
  };

  return (
    <div
      id="profile-edit"
      className={clsx({ [styles.container]: true, [styles.open]: visible })}
    >
      <div
        onClick={toggleMenu}
        className={clsx({
          [styles.menu]: true,
          [styles['menu--open']]: visible,
        })}
      >
        <FontAwesomeIcon icon={faBars} />
      </div>
      <Tabs
        tabPosition="left"
        defaultActiveKey={props.tab === 'preferences' ? '4' : '1'}
        tabBarExtraContent={
          <div>
            <a href={`/authors/${profile?.username}`}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back to Profile
            </a>
          </div>
        }
      >
        <Tabs.TabPane tab="Edit Profile" key="1">
          <EditProfileForm
            profile={profile}
            onProfileChange={onProfileChange}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Account Settings" key="2">
          <AccountSettingsForm
            profile={profile}
            onProfileChange={onProfileChange}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Social App" key="3">
          <SocialForm profile={profile} onProfileChange={onProfileChange} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Preferences" key="4">
          <Preferences profile={profile} onProfileChange={onProfileChange} />
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <div className={styles.notifications}>
              Notifications<span className={styles.upcoming}>Upcoming!</span>
            </div>
          }
          key="5"
        >
          <NotificationSettings />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Blocking" key="6">
          <BlockAuthorList profile={profile} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default EditProfileTabs;
