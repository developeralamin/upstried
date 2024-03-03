import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import ProfileAPI from '../../api/profile/request';
import MobileDetect from '../../components/mobileDetect/MobileDetect';
import Survey from '../../components/survey/Survey';
import Topbar from '../../components/topbar/Topbar';
import { BASE_TITLE } from '../../config/metas';

const DashboardLayout: React.FC = (props) => {
  const [profile, setProfile] = useState<any | null>();

  useEffect(() => {
    const getProfile = async () => {
      const profile = new ProfileAPI();
      const profileResponse = await profile.get();
      if (profileResponse) {
        setProfile(profileResponse);
      }
    };
    getProfile();
  }, []);
  return (
    <>
      <Head>
        <title>{BASE_TITLE}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Topbar position="fixed" profile={profile} />
      {props.children}
      <Survey profile={profile} />
      <MobileDetect />
    </>
  );
};

export default DashboardLayout;
