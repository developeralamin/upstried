import { Logger } from 'aws-amplify';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import TipsAPI from '../../../../api/books/request';
import CommentsAPI from '../../../../api/comments/request';
import TipsContentLayout from '../../../../components/TipsContentLayout/TipsContentLayout';
import TaskInterface from '../../../../interfaces/task.interface';
import { getAuthToken } from '../../../../services/authentication';
// import { getSessionInfo } from '../../../../services/cookieStorageSync';
import Error from 'next/error';
import { useRouter } from 'next/router';
import ProfileAPI from '../../../../api/profile/request';
import { withTipsInterface } from '../../../../interfaces/tips.interface';

interface TipDetailsProps extends withTipsInterface {
  comments: any[];
  totalComments: number;
  isPractice: boolean;
}

const Tips: React.FC<TipDetailsProps> = (props) => {
  const router = useRouter();

  const { tips } = props;
  const [totalComments, setTotalComments] = useState(props.totalComments);
  useEffect(() => {
    setTotalComments(props.totalComments);
  }, [props.totalComments]);

  const onCommentCreatedHandler = async (comment: any) => {
    if (comment) {
      setTotalComments((prevTotalComments: number) => prevTotalComments + 1);
    }
  };
  const onCommentDeletedHandler = async (comment: any) => {
    if (comment) {
      setTotalComments((prevTotalComments: number) => prevTotalComments - 1);
    }
  };
  const getSchemaTask = () => {
    const tasks = [...tips.tasks];
    return tasks.map((task: TaskInterface) => ({
      '@type': 'HowToStep',
      text: task.title,
    }));
  };

  if (!tips.id) {
    return <Error statusCode={404} />;
  }

  //FetchUser for expire_Date
  const fetchData = async () => {
    try {
      const profile = new ProfileAPI();
      const profileResponse = await profile.get();
      if (profileResponse?.expire_date) {
        const expireDate = new Date(profileResponse.expire_date);
        const todayDate = new Date();

        if (expireDate < todayDate) {
          router.push({ pathname: '/packages' });
        }
      } else {
        router.push({ pathname: '/packages' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>{tips.title} | UpStride</title>
        <meta name="title" content={tips.title} />
        <meta name="description" content={tips.description.content} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${tips.detailsUrl}`} />
        <meta property="og:title" content={tips.title} />
        <meta property="og:description" content={tips.description.content} />
        <meta property="og:image" content={tips.attachment?.url} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={tips.title} />
        <meta
          property="twitter:description"
          content={tips.description.content}
        />
        <meta property="twitter:image" content={tips.thumbnail} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org/',
              '@type': 'HowTo',
              name: tips.title,
              description: tips.description.content,
              image: tips.thumbnail,
              step: getSchemaTask(),
            }),
          }}
        />
      </Head>
      <TipsContentLayout
        tips={tips}
        comments={props.comments}
        totalComments={totalComments}
        isPractice={false}
        onCommentCreated={onCommentCreatedHandler}
        onCommentDeleted={onCommentDeletedHandler}
      />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { slug, id } = context.query;

  let result: any = {
    tips: null,
    comments: [],
    totalComments: 0,
  };

  const token = getAuthToken(context.req);
  const logger = new Logger('tips-web-token-check');

  logger.info('check token on tips slug', {
    token,
    cookie: context.req.headers.cookie,
  });
  try {
    const { data: tips } = await TipsAPI.getBySlug({ id, token });
    result = { ...result, tips };
  } catch (error) {
    console.error(error);
  }

  try {
    const commentsResponse = await CommentsAPI.getByTipsSlug({
      slug: id,
      token,
    });
    result = {
      ...result,
      comments: commentsResponse.data,
      totalComments: commentsResponse.meta.total,
    };
  } catch (error) {
    console.error(error);
  }

  return { props: result };
};

export default Tips;
