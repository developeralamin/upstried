import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProfileAPI from '../../api/profile/request';
import Payment from '../../components/payment/Payment';
import Topbar from '../../components/topbar/Topbar';
import { HOME_ROUTE } from '../../config/endpoints';
import { isAuthenticated } from '../../services/authentication';

const Payments = () => {
  const router = useRouter();
  const { payments } = router.query;

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
        <title>Upstride - Payments Plan</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Topbar position="fixed" profile={profile} />
      <Payment payments={payments} />
    </>
  );
};

export default Payments;
