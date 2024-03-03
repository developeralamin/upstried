import { message } from 'antd';
import Error from 'next/error';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { mapTipsServerToClient } from '../../../../api/books/mapper';
import CommentsAPI from '../../../../api/comments/request';
import ProfileAPI from '../../../../api/profile/request';
import { TaskObj } from '../../../../api/tasks/dataTypes';
import { TaskAPI } from '../../../../api/tasks/request';
import TipsContentLayout from '../../../../components/TipsContentLayout/TipsContentLayout';
import { HTTP_SUCCESS_STATUS } from '../../../../config/api';
import { BASE_TITLE } from '../../../../config/metas';
import { getAuthToken } from '../../../../services/authentication';

const TipsPractice: React.FC = () => {
  const router = useRouter();
  const { id, enrollment_id } = router.query; //in practice id==slug
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tasks, setTasks] = React.useState<TaskObj[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const [tips, setTips] = useState<any>(null);
  const [comments, setComments] = useState<any>([]);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!tips) {
      return;
    }
    fetchComments();
  }, [tips]);

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

  const [progressStatus, setProgressStatus] = React.useState({
    total: 1,
    done: 0,
    skipped: 0,
    failed: 0,
  });

  React.useEffect(() => {
    if (!enrollment_id) {
      return;
    }
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const tasksResponse = await new TaskAPI().getTasksByEnrollmentId(
          enrollment_id as string
        );

        if (tasksResponse) {
          setTasks(tasksResponse.data);
          setTips(mapTipsServerToClient(tasksResponse.tips));
          setProgressStatus({
            total: tasksResponse.total,
            done: tasksResponse.done,
            failed: tasksResponse.failed,
            skipped: tasksResponse.skipped,
          });
        }
        setLoading(false);
      } catch (exception) {
        setNotFound(true);
        console.error(exception);
        message.error('Oops! Something went wrong!!!');
        setLoading(false);
      }
    };
    fetchTasks();
  }, [enrollment_id]);

  // async function fetchTip() {
  //   const token = getAuthToken();
  //   const tipResponse = await TipsAPI.getById({ slug: id }, token as any);
  //   if (tipResponse.status !== HTTP_SUCCESS_STATUS) {
  //     setNotFound(true);
  //   }
  //   if (tipResponse.status === HTTP_SUCCESS_STATUS && tipResponse.data) {
  //     setTips(tipResponse.data);
  //   }
  // }

  async function fetchComments() {
    const token = getAuthToken();
    const commentResponse = await CommentsAPI.getByTipId(
      {
        slug: tips.id,
      },
      token
    );
    if (
      commentResponse.status === HTTP_SUCCESS_STATUS &&
      commentResponse.data
    ) {
      setComments(commentResponse.data);
      setTotalComments(commentResponse.total);
    }
  }

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

  if (notFound) return <Error statusCode={404} />;

  return (
    <div>
      <Head>
        <title>
          {BASE_TITLE}| {tips?.title || 'Practice'}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={tips?.title || ''} />
        <meta property="og:description" content={tips?.description || ''} />
        <meta property="og:image" content={tips?.attachment?.url || ''} />
      </Head>
      {tips ? (
        <TipsContentLayout
          tasks={tasks}
          setTasks={setTasks}
          loading={loading}
          setLoading={setLoading}
          progressStatus={progressStatus}
          setProgressStatus={setProgressStatus}
          tips={tips}
          comments={comments}
          totalComments={totalComments}
          isPractice={true}
          onCommentCreated={onCommentCreatedHandler}
          onCommentDeleted={onCommentDeletedHandler}
        />
      ) : null}
    </div>
  );
};

export default TipsPractice;
