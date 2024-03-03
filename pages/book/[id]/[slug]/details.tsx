import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TipsAPI from '../../../../api/books/request';
import ProfileAPI from '../../../../api/profile/request';
import SingleTipsDetails from '../../../../components/singleTips/SingleTipsDetails';
import Topbar from '../../../../components/topbar/Topbar';
import { HOME_ROUTE } from '../../../../config/endpoints';
import { isAuthenticated } from '../../../../services/authentication';

const BooksDetails = () => {
  const [profile, setProfile] = useState<any | null>();
  const [tips, setTips] = useState<any | null>();

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if slug is available
        if (slug) {
          const { data: tipsData } = await TipsAPI.getBySlug({ id: slug });
          setTips(tipsData);
        }
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
  }, [slug]);

  return (
    <>
      <Head>
        <title>Upstride {tips && tips.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Topbar position="fixed" profile={profile} />
      {tips && profile && <SingleTipsDetails tips={tips} profile={profile} />}
    </>
  );
};

export default BooksDetails;
