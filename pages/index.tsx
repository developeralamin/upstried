import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect } from 'react';
import TipsAPI from '../api/books/request';
import ScrollToTop from '../components/scrollToTop/ScrollToTop';
import TipsList from '../components/tipsList/TipsList';
import { SITE_URL } from '../config/endpoints';
import Filter from '../containers/filter/Filter';
import Layout from '../hoc/layout/Layout';
import {
  TipsBaseInterface,
  TipsMetaInterface,
} from '../interfaces/tips.interface';
import { getAuthToken, isAuthenticated } from '../services/authentication';
const Banner = dynamic(() => import('../components/banner/Banner'), {
  ssr: false,
});
interface HomeProps {
  tips: TipsBaseInterface[];
  meta: TipsMetaInterface;
}

const Home: React.FC<HomeProps> = (props) => {
  const ogImage = SITE_URL + '/home/banner/illustration.jpg';

  useEffect(() => {
    const redirect_url = 'redirect_url';
    if (localStorage.getItem(redirect_url) && isAuthenticated()) {
      const path = localStorage.getItem(redirect_url);
      localStorage.removeItem(redirect_url);
      window.location.href = path as string;
    }
  }, []);
  return (
    <Layout>
      <Head>
        <title>UpStride - Where Success Becomes A Habit</title>
        <meta name="title" content="UpStride - Where Success Becomes A Habit" />
        <meta
          name="description"
          content="Get the best tips in readily actionable format, from experts around the world, for every area of life."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta
          property="og:title"
          content="UpStride - Where Success becomes A Habit"
        />
        <meta
          property="og:description"
          content="Get the best tips in readily actionable format, from experts around the world, for every area of life."
        />
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:title"
          content="UpStride, Redefining Productivity"
        />
        <meta
          property="twitter:description"
          content="Get the best tips in readily actionable format, from experts around the world, for every area of life."
        />
        <meta property="twitter:image" content={ogImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Project',
              name: 'Virtunus',
              alternateName: 'Tips.Virtunus',
              url: 'https://tips.virtunus.com/',
              logo: 'https://tips.virtunus.com/logo.png',
            }),
          }}
        />
      </Head>
      {!isAuthenticated() ? <Banner /> : null}
      <div className="container">
        <Filter />
        <TipsList
          tips={props.tips}
          previewOnly
          meta={props.meta}
          querySearch={true}
          initialLoad={props.tips?.length === 0 ? true : false}
        />
        <ScrollToTop />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let result: any = {
    tips: [],
    meta: null,
  };
  try {
    const token = getAuthToken(context.req);
    const { author, tags, q, preference }: any = context.query;
    const headers = {
      'Accept-Language': context.req.headers['accept-language'],
    };
    const response = await TipsAPI.fetchTips({
      tags,
      author,
      q,
      preference,
      token,
      headers,
    });
    result = {
      ...result,
      tips: [...result.tips, ...response.data],
      meta: response.meta,
    };
    return { props: result };
  } catch (error) {
    console.error(error);
    return { props: result };
  }
};

export default Home;
