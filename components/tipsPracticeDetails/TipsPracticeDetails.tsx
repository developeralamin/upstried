import { Button } from 'antd';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import PracticeContent from '../practiceContent/PracticeContent';
import PracticeProgressBar from '../practiceContent/practiceProgressBar/PracticeProgressBar';
import AuthorInfo from '../tipsAuthor/TipsAuthor';
import { TipsPracticeDetailsProps } from './TipsPracticeDetails.d';
import styles from './TipsPracticeDetails.module.scss';

const TipsPracticeDetails = (props: TipsPracticeDetailsProps) => {
  const router = useRouter();
  const { enrollment_id } = router.query;

  console.log('enrollemnt id', enrollment_id);
  const {
    tips,
    tasks,
    setTasks,
    loading,
    setLoading,
    progressStatus,
    setProgressStatus,
  } = props;
  // const [progressStatus, setProgressStatus] = React.useState({
  //   total: 1,
  //   done: 0,
  //   skipped: 0,
  //   failed: 0,
  // });

  React.useEffect(() => {
    if (!tips.enrolled) {
      router.push(tips.detailsUrl);
    }
  });
  const filterWithTag = (tag: string) => {
    router.push({
      pathname: '/',
      query: {
        tags: tag,
      },
    });
  };

  return (
    <div className={styles.TipsDetailsWrapper}>
      <div className={styles.TipsDetailsHeadContent}>
        <h1>Take Action</h1>
        <p>
          You can utilize the learning of this book in real life through the
          following actionable tasks.
        </p>
      </div>
      <div className={clsx(styles.TipsDetailsContent, 'TipsDetailsContent')}>
        <div className={styles.TipsDetails}>
          <div className={styles['tips-header']}>
            <PracticeProgressBar
              enrollmentStatus={tips.enrollmentStatus}
              progressStatus={progressStatus}
            />
            <h1 className={styles.Title}>{tips.title}</h1>
            <div className={styles.Meta}>
              <div className={styles['meta-container']}>
                <AuthorInfo author={tips.author} />
                {tips.publishedAt}
              </div>
              <div className={styles.ReportDetailsBtnWrapper}>
                <Link href={`/books/enrollments/${enrollment_id}/report`}>
                  <a>
                    <Button shape="round" className={styles.BtnDetails}>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.25 11.25H11.25V12.5H6.25V11.25ZM6.25 8.125H13.75V9.375H6.25V8.125ZM6.25 14.375H9.375V15.625H6.25V14.375Z"
                          fill="currentColor"
                        />
                        <path
                          d="M15.625 3.125H13.75V2.5C13.75 2.16848 13.6183 1.85054 13.3839 1.61612C13.1495 1.3817 12.8315 1.25 12.5 1.25H7.5C7.16848 1.25 6.85054 1.3817 6.61612 1.61612C6.3817 1.85054 6.25 2.16848 6.25 2.5V3.125H4.375C4.04348 3.125 3.72554 3.2567 3.49112 3.49112C3.2567 3.72554 3.125 4.04348 3.125 4.375V17.5C3.125 17.8315 3.2567 18.1495 3.49112 18.3839C3.72554 18.6183 4.04348 18.75 4.375 18.75H15.625C15.9565 18.75 16.2745 18.6183 16.5089 18.3839C16.7433 18.1495 16.875 17.8315 16.875 17.5V4.375C16.875 4.04348 16.7433 3.72554 16.5089 3.49112C16.2745 3.2567 15.9565 3.125 15.625 3.125ZM7.5 2.5H12.5V5H7.5V2.5ZM15.625 17.5H4.375V4.375H6.25V6.25H13.75V4.375H15.625V17.5Z"
                          fill="currentColor"
                        />
                      </svg>
                      Show Report
                    </Button>
                  </a>
                </Link>
                <a href={tips.detailsUrl}>
                  <Button shape="round" className={styles.BtnDetails}>
                    <i className="icon-Vector-2"></i> View details
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <PracticeContent
            tasks={tasks}
            setTasks={setTasks}
            loading={loading}
            setLoading={setLoading}
            tipSlug={tips.slug}
            enrollmentId={enrollment_id as string}
            setProgressStatus={setProgressStatus}
          />
          {tips.tags && tips.tags.length > 0 && (
            <div className={styles.Tags}>
              <span>Tags</span>
              {tips.tags.map((tag: string, index: number) => (
                <Button onClick={() => filterWithTag(tag)} key={index}>
                  {tag}
                </Button>
              ))}
            </div>
          )}
        </div>
        {/* <AuthorOnDetailedTip tipsSlug={tips.slug} author={tips.author} /> */}
        {/* {props.tipsDetailsActions} */}
      </div>
      {props.commentsWindowCloser}
    </div>
  );
};

export default TipsPracticeDetails;
