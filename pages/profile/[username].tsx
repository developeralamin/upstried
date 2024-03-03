import { GetServerSideProps } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import React from 'react';
import { ProfileObj } from '../../api/profile/dataTypes';
import { ServerProfileAPI } from '../../api/profile/request';
import ProfileBanner from '../../components/profileBanner/ProfileBanner';
import ProfileOwnerContents from '../../components/profileDetails/ProfileDetails';
import { BASE_TITLE } from '../../config/metas';
import Layout from '../../hoc/layout/Layout';

export interface ProfileProps {
  userProfile: ProfileObj;
}

const Profile: React.FC<ProfileProps> = (props) => {
  if (!props.userProfile) {
    return <Error statusCode={404} />;
  }

  return (
    <Layout>
      <Head>
        <title>
          {BASE_TITLE} | {props.userProfile.name}
        </title>
      </Head>
      <ProfileBanner profile={props.userProfile} isFullFlex={true} />
      <ProfileOwnerContents profile={props.userProfile} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { req } = context;
  let result = {};
  try {
    const profileData = await new ServerProfileAPI().get(req);

    result = {
      ...result,
      userProfile: profileData,
    };

    return {
      props: result,
    };
  } catch (error) {
    console.error(error);
    return {
      props: result,
    };
  }
};

export default Profile;
