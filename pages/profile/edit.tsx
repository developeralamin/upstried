import { GetServerSideProps } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import React from 'react';
import { ProfileObj } from '../../api/profile/dataTypes';
import { ServerProfileAPI } from '../../api/profile/request';
import EditProfileContent from '../../components/editProfileContent/EditProfileContent';
import { HOME_ROUTE } from '../../config/endpoints';
import { BASE_TITLE } from '../../config/metas';
import Layout from '../../hoc/layout/Layout';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../../services/authentication';

export interface EditProfileProps {
  profile: ProfileObj | undefined;
  isSessionPresent: boolean;
}

const EditProfile: React.FC<EditProfileProps> = (props) => {
  const { profile, isSessionPresent } = props;
  const router = useRouter();
  const { tab } = router.query;

  React.useEffect(() => {
    if (!isSessionPresent) {
      window.location.href = HOME_ROUTE;
    }
  });

  return !isSessionPresent ? (
    <Error statusCode={401} title="Unauthorized Access" />
  ) : (
    <Layout>
      <style global jsx>{`
        #header {
          position: fixed;
          width: 100%;
          z-index: 10;
          top: 0;
        }
      `}</style>
      <Head>
        <title>
          {BASE_TITLE} | {profile?.name}
        </title>
      </Head>
      {profile && <EditProfileContent tab={tab} profile={profile} />}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { req } = context;

  try {
    const profile = await new ServerProfileAPI().get(req);
    return {
      props: { profile, isSessionPresent: isAuthenticated(req) },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};

export default EditProfile;
