import Head from 'next/head';
import { useEffect, useState } from 'react';
import ProfileAPI from '../api/profile/request';
import Package from '../components/package/Package';
import Topbar from '../components/topbar/Topbar';
import { HOME_ROUTE } from '../config/endpoints';
import { isAuthenticated } from '../services/authentication';

const Packages = () => {
  const [profile, setProfile] = useState<any | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = new ProfileAPI();
        const profileResponse = await profile.get();
        if (profileResponse) {
          setProfile(profileResponse);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    if (!isAuthenticated()) window.location.href = HOME_ROUTE;
  }, []);

  return (
    <>
      <Head>
        <title>Upstride - Package Plan</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Topbar position="fixed" profile={profile} />
      <Package />
    </>
  );
};

export default Packages;
