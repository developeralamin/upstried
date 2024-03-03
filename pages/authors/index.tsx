import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React from 'react';
import ServerAuthorsAPI from '../../api/authors/request';
import { CategoryDataType } from '../../api/category/dataTypes';
import AuthorsList from '../../components/authorsList/AuthorsList';
import Banner from '../../components/banner/Banner';
import ScrollToTop from '../../components/scrollToTop/ScrollToTop';
import { SITE_URL } from '../../config/endpoints';
import Filter from '../../containers/filter/Filter';
import Layout from '../../hoc/layout/Layout';
import { getAuthToken, isAuthenticated } from '../../services/authentication';
import styles from './Authors.module.scss';

interface PopularTipsProps {
  authors: any[];
  total: number;
  page: number;
  categories: CategoryDataType[];
}

const AuhtorPage: React.FC<PopularTipsProps> = (props) => {
  const ogImage = SITE_URL + '/home/banner/illustration.png';
  const metaDescription =
    'Virutunus author is always there to educate the Tips by Virtunus with multiple groundbreaking blogs. Enjoy!';
  const metaTitle = 'Author | Tips & Advice for Life';
  const setTitle = metaTitle;
  return (
    <Layout>
      <Head>
        <title>{setTitle}</title>
        <meta name="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={metaTitle} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={ogImage} />
      </Head>
      {!isAuthenticated() ? <Banner /> : null}{' '}
      <div className="container">
        <div className={styles.PopularTips}>
          <Filter />
          <div className={styles.TipsContent}>
            <AuthorsList
              authors={props.authors}
              total={props.total}
              page={props.page}
            />
          </div>
        </div>
        <ScrollToTop />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let result: any = {
    authors: [],
  };
  try {
    const token = getAuthToken(context.req);


    const authorsParams: any = {};
    authorsParams['tags'] = context.query.tags || '';
    authorsParams['category'] = context.query.category || '';
    authorsParams['q'] = context.query.q || '';
    authorsParams['author'] = context.query.author || '';
    authorsParams['tags'] = context.query.tags || '';
    authorsParams['preference'] = 'popular';

    const authorsResponse = await ServerAuthorsAPI.all(
      authorsParams,
      token as any
    );
    if (authorsResponse?.status === 200) {
      result = {
        ...result,
        authors: [...result.authors, ...authorsResponse.data],
        total: authorsResponse.total,
        page: authorsResponse.page,
      };
    }

    return { props: result };
  } catch (error) {
    console.error(error);
    return { props: result };
  }
};

export default AuhtorPage;
