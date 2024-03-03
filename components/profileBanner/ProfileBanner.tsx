import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown, Menu, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { ProfileObj } from '../../api/profile/dataTypes';
import ProfileAPI from '../../api/profile/request';
import { PROFILE_EDIT_ROUTE } from '../../config/endpoints';
import { getAuthUser } from '../../services/authentication';
import { copyLink } from '../../services/util';
import AuthorFollowActions from '../authorFollowAction/AuthorFollowAction';
import BlockAuthor from '../blockAuthor/BlockAuthor';
import ProfileCounts from '../profileCounts/ProfileCounts';
import ProfileEditBanner from '../profileEditBanner/ProfileEditBanner';
import styles from './ProfileBanner.module.scss';
import { Avatar } from 'antd';

export interface ProfileBannerProps {
  profile: ProfileObj;
  isBgDark?: boolean;
  isLavelShow?: boolean;
  isBadgeShow?: boolean;
  isFullFlex?: boolean;
}

const ProfileBanner: React.FC<ProfileBannerProps> = (
  props: ProfileBannerProps
) => {
  const [profile, setProfile] = useState<any>(null);
  const [nonVarifiedWarning, setNonVarifiedWarning] = useState(false);

  const onProfileUpdate = (updatedProfile: any) => {
    setProfile(updatedProfile);
  };

  useEffect(() => {
    setProfile(props.profile);
  }, [props.profile]);

  const copyProfileLink = () => {
    copyLink(props.profile.sharableUrl);
    message.success('Link copied!');
  };
  const profileObj = profile || props.profile;

  const isMyProfile = () => {
    let userInfo: any = getAuthUser();
    return userInfo?.username === profileObj.username;
  };

  const onChangeCover = async (requested: string) => {
    try {
      await new ProfileAPI().changeCover(requested);
      setProfile({ ...profile, cover: requested });
    } catch (exception) {
      console.error(exception);
    }
  };

  return (
    <div
      className={`${styles.ProfileBanner} ${isMyProfile() ? styles.AuthorProfile : ''
        }`}
      style={
        profile && profile?.cover !== ''
          ? {
            backgroundImage: `linear-gradient(to right, rgba(0,0,0, 0.2) 0 100%), url(${profile?.cover})`,
          }
          : {
            backgroundImage: `linear-gradient(to right, rgba(0,0,0, 0.2) 0 100%), url("/cover_photo.png")`,
          }
      }
    >
      <div className="container" style={{ position: 'relative' }}>
        <div className={styles.Top}>
          <div className={styles.left}>
            <Avatar
              className={styles.Avatar}
              size={100}
              src={profileObj?.avatar !== '' ? profileObj?.avatar : null}
            >
              {profileObj?.name[0]}
            </Avatar>
            <div>
              <div className={styles.NameWithSuffix}>
                <h1 className={styles.Name}>{profileObj.name}</h1>
                {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
                {profileObj.isVerified && ( // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                  <div className={styles.Varified}>
                    <img src="/icons/verified.svg" alt="Icon" />
                  </div>
                )}
              </div>
              {profileObj.profession && (
                <div className={styles.Profession}>{profileObj.profession}</div>
              )}
              {profileObj.quote && (
                <div className={styles.Quote}>{profileObj.quote}</div>
              )}
              <div className={styles.Actions}>
                {!isMyProfile() ? (
                  <AuthorFollowActions
                    author={profileObj}
                    onUpdate={onProfileUpdate}
                  />
                ) : (
                  <Button className={styles.EditBtn} type="primary">
                    <a href={PROFILE_EDIT_ROUTE}>Edit Profile</a>
                  </Button>
                )}
                <Dropdown
                  trigger={['click']}
                  overlay={
                    <Menu className="dropdown-style1 profile-actions">
                      <Menu.Item>
                        <Button
                          onClick={copyProfileLink}
                          className="btn-with-icon"
                        >
                          <FontAwesomeIcon icon={faLink} />
                          <span>Copy Link</span>
                        </Button>
                      </Menu.Item>
                      <Menu.Item>
                        <BlockAuthor author={profileObj} />
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <div className={styles.Toggler}>
                    <div></div>
                    <div></div>
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
          <div>
            <ProfileCounts
              tips={profileObj.ownTips}
              thumbsUp={profileObj.thumbsUp}
              followers={profileObj.followers}
              views={profileObj.views}
              isAuthor={isMyProfile()}
            />
          </div>
          <div>
            {/* {profileObj.city && profileObj.country && (
              <span className={styles.City}>
                {profileObj.city}, {profileObj.country}
              </span>
            )} */}
            {profileObj.personal && profileObj.personal !== '' && (
              <a href={profileObj.personal} target="blank">
                <img src="/personal.svg" className={styles.logo} alt="" />
              </a>
            )}
            {profileObj.linkedin && profileObj.linkedin !== '' && (
              <a href={profileObj.linkedin} target="blank">
                <img src="/linkedin.svg" className={styles.logo} alt="" />
              </a>
            )}
            {profileObj.twitter && profileObj.twitter !== '' && (
              <a href={profileObj.twitter} target="blank">
                <img src="/twitter.svg" className={styles.logo} alt="" />
              </a>
            )}
            {profileObj.facebook && profileObj.facebook !== '' && (
              <a href={profileObj.facebook} target="blank">
                <img src="/facebook.svg" className={styles.logo} alt="" />
              </a>
            )}
            {profileObj.youtube && profileObj.youtube !== '' && (
              <a href={profileObj.youtube} target="blank">
                <img src="/youtube.svg" className={styles.logo} alt="" />
              </a>
            )}
          </div>
        </div>
        <div className={styles['edit-banner']}>
          {isMyProfile() && <ProfileEditBanner setCover={onChangeCover} />}
        </div>
      </div>
      <div className={styles.Overlay}></div>
    </div>
  );
};

export default ProfileBanner;
