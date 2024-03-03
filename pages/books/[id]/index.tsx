import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getAuthToken } from '../../../services/authentication';
import { Logger } from 'aws-amplify';
import CommentsAPI from '../../../api/comments/request';
import TipsAPI from '../../../api/books/request';
import TipsContentLayout from '../../../components/TipsContentLayout/TipsContentLayout';
import { HTTP_SUCCESS_STATUS } from '../../../config/api';
import TaskInterface from '../../../interfaces/task.interface';
// import { getSessionInfo } from '../../../../services/cookieStorageSync';
import Error from 'next/error';
import { SITE_URL } from '../../../config/endpoints';
import {
  TipsInterface,
  withTipsInterface,
} from '../../../interfaces/tips.interface';

interface TipDetailsProps extends withTipsInterface {
  comments: any[];
  totalComments: number;
  isPractice: boolean;
}

const Tips: React.FC<TipDetailsProps> = (props) => {
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

  if (!tips?.id) {
    return <Error statusCode={404} />;
  }

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
  let dataTips: TipsInterface | null = null;
  try {
    const { data: tips } = await TipsAPI.getBySlug({ id, token });
    result = { ...result, tips };
    dataTips = tips;
    // console.log('dataTips', dataTips);
  } catch (error) {
    console.error(error);
  }

  return {
    redirect: {
      permanent: false,
      destination: `/books/${(dataTips as TipsInterface).id}/${
        (dataTips as TipsInterface).slug
      }`,
    },
    props: {},
  };

  // return { props: result };
};

export default Tips;
