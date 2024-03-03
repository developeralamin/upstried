import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import Error from 'next/error';
import Head from 'next/head';
import React from 'react';
import { AuthorObj } from '../../api/authors/dataTypes';
import ServerAuthorsAPI from '../../api/authors/request';

import ProfileBanner from '../../components/profileBanner/ProfileBanner';
import ProfileFooter from '../../components/profileFooter/ProfileFooter';
import { SITE_URL } from '../../config/endpoints';
import { BASE_TITLE } from '../../config/metas';
import Layout from '../../hoc/layout/Layout';
import { getAuthToken } from '../../services/authentication';
import { strlen } from '../../services/util';
const ProfileDetails = dynamic(
  () => import('../../components/profileDetails/ProfileDetails'),
  { ssr: false }
);
export interface ProfileProps {
  author: AuthorObj;
}
const Profile: React.FC<ProfileProps> = (props) => {
  if (!props.author?.name) {
    return <Error statusCode={404} />;
  }

  const ogImage = props.author.avatar
    ? props.author.avatar
    : SITE_URL + '/home/banner/illustration.jpg';
  const metaDescription = props.author.quote
    ? props.author.quote
    : strlen(props.author.about, 55);
  const metaTitle: string = props.author.name;
  const seoTitle = metaTitle;
  const getWorksFor = () => {
    return props.author.workplaces.map((workplace: any) => ({
      '@type': 'Organization',
      name: workplace.workplace,
    }));
  };

  return (
    <Layout>
      <Head>
        <title>
          {seoTitle}| {BASE_TITLE}
        </title>
        <meta name="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${SITE_URL}/authors/${props.author.username}`}
        />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={metaTitle} />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={ogImage} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'Person',
              name: props.author.name,
              url: props.author.authorUrl,
              image: props.author.avatar,
              sameAs: props.author.authorUrl,
              jobTitle: props.author.profession,
              worksFor: getWorksFor(),
            }),
          }}
        />
      </Head>
      <ProfileBanner profile={props.author} isFullFlex={true} />
      {<ProfileDetails profile={props.author} />}
      <ProfileFooter />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  let result = {
    author: {},
  };
  try {
    const token = getAuthToken(context.req);

    const authorResponse = await ServerAuthorsAPI.get({
      username: context.query.username,
      token: token,
    });
    if (authorResponse && authorResponse.status === 200) {
      result = {
        ...result,
        author: authorResponse.data,
      };
    }

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
