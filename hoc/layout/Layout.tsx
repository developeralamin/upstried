import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import ProfileAPI from '../../api/profile/request';
import MobileDetect from '../../components/mobileDetect/MobileDetect';
import Survey from '../../components/survey/Survey';
import Topbar from '../../components/topbar/Topbar';
import { BASE_TITLE } from '../../config/metas';

const Layout: React.FC = (props) => {
  const [profile, setProfile] = useState<any | null>();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profile = new ProfileAPI();
      const profileResponse = await profile.get();
      if (profileResponse) {
        setProfile(profileResponse);
      }
    } catch (e) {
      console.error('something went wrong');
    }
  };

  return (
    <>
      <Head>
        <title>{BASE_TITLE}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Topbar profile={profile} />
      {props.children}
      <Survey profile={profile} />
      <MobileDetect />
    </>
  );
};

export default Layout;
