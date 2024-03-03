import { Tabs } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ProfileObj } from '../../api/profile/dataTypes';
import {
  SERVER_TIPS_MYTIPS_FETCH_ENDPOINT,
  SERVER_TIPS_SAVED_FETCH_ENDPOINT,
} from '../../config/endpoints';
import { getAuthUser } from '../../services/authentication';
import AuthorFollowers from '../authorFollowers/AuthorFollowers';
import AuthorFollowings from '../authorFollowings/AuthorFollowings';
import Bio from '../bio/Bio';
import MyEnrolledTips from '../myEnrolledTips/MyEnrolledTips';
import TipsList from '../tipsList/TipsList';
import styles from './ProfileDetails.module.scss';
const { TabPane } = Tabs;

export interface ProfileDetailsProps {
  profile: ProfileObj;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = (props) => {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<any>();
  const queryParamsMapper: any = {
    tips: '1',
    'enrolled-tips': '2',
    'saved-tips': '3',
    followings: '4',
    followers: '5',
    bio: '6',
  };
  const queryParamsMapperRev: any = {
    //queryParamsMapperRev duplicate because we get number from tab click handler and string from route
    '1': 'tips',
    '2': 'enrolled-tips',
    '3': 'saved-tips',
    '4': 'followings',
    '5': 'followers',
    '6': 'bio',
  };
  useEffect(() => {
    const { tab } = router.query;
    if (tab) {
      setActiveKey(queryParamsMapper[tab as string]);
    } else {
      setActiveKey('1');
    }
  }, [router]);

  const onTabClickHandler = (evt: any) => {
    setActiveKey(evt);
    router.replace(
      {
        pathname: router.route,
        query: {
          username: router.query.username,
          tab: queryParamsMapperRev[evt as string],
        },
      },
      undefined,
      { shallow: true }
    );
  };
  const isMyProfile = () => {
    const userInfo: any = getAuthUser();
    return userInfo?.username === props.profile.username;
  };
  return (
    <div className={styles.ProfileDetails} id="profile_content">
      <Tabs activeKey={activeKey} onTabClick={onTabClickHandler}>
        <TabPane tab={!isMyProfile() ? 'Books' : 'My Books'} key="1">
          <TipsList
            searchbar={true}
            initialLoad={true}
            privacyActive={true}
            endpoint={SERVER_TIPS_MYTIPS_FETCH_ENDPOINT.replace(
              ':username',
              props.profile.username
            )}
          />
        </TabPane>
        {isMyProfile() ? (
          <TabPane tab="Enrolled Books" key="2">
            <MyEnrolledTips
              privacyOn={true}
              username={props.profile.username}
            />
          </TabPane>
        ) : null}
        {isMyProfile() ? (
          <TabPane tab="Saved Books" key="3">
            <TipsList
              searchbar={true}
              endpoint={SERVER_TIPS_SAVED_FETCH_ENDPOINT.replace(
                ':username',
                props.profile.username
              )}
              initialLoad={true}
            />
          </TabPane>
        ) : null}
        <TabPane tab="Followings" key="4">
          <AuthorFollowings username={props.profile.username} />
        </TabPane>
        <TabPane tab="Followers" key="5">
          <AuthorFollowers username={props.profile.username} />
        </TabPane>
        <TabPane tab="Bio" key="6">
          <Bio profile={props.profile} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfileDetails;
