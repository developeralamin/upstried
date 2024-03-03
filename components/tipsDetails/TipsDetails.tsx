import { Button, message } from 'antd';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import TipsAPI from '../../api/books/request';
import { HTTP_SUCCESS_STATUS } from '../../config/api';
import { isAuthenticated } from '../../services/authentication';
import AttachmentToolbar from '../attachmentToolbar/AttachmentToolbar';
import TasksOnDetailedTip from '../tasksOnDetailedTip/TasksOnDetailedTip';
import TipsDetailsPracticeAction from '../tipsDetailsPracticeAction/TipsDetailsPracticeAction';
import TipListItem from '../tipsListItem/TipsListItem';
import TipsMeta from '../tipsMeta/TipsMeta';
import { TipsDetailsProps } from './TipsDetails.d';
import styles from './TipsDetails.module.scss';

const TipsDetails: React.FC<TipsDetailsProps> = (props) => {
  const router = useRouter();
  const { tips, commentsWindowCloser, profile }: { profile: any } = props;
  const filterWithTag = (tag: string) => {
    router.push({
      pathname: '/',
      query: {
        tags: tag,
      },
    });
  };

  /**
   * Create Enrollment
   */
  const { t } = useTranslation('tips');
  const enroll = async () => {
    try {
      const response = await TipsAPI.enroll({ slug: tips.slug });
      message.success(t('enroll.message.success'));
      if (response && response.status === HTTP_SUCCESS_STATUS) {
        router.push(response.data?.practiceUrl as string);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const expire_date = new Date(profile?.expire_date);
  const todayDate = new Date();
  const expireDateNull = profile?.expire_date === '';

  return (
    <div className={styles.TipsDetailsWrapper}>
      <div className={styles.TipsDetailsContent + ' TipsDetailsContent'}>
        <div className={styles.TipsDetails}>
          <div className={styles['tips-header']}>
            <h1 className={styles.Title}>{tips.title}</h1>
            <div className={clsx('d-flex w-100 jc-between', styles.Meta)}>
              <TipsMeta
                author={tips.author}
                category={tips.category}
                categoryUrl={tips.categoryUrl}
                publishedAt={tips.publishedAt}
                updatedAt={tips.updatedAt}
                tipsPrivacy={tips.privacy}
                tipsDetailsAuthor={true}
              />
              {expireDateNull || expire_date < todayDate ? (
                <Link href="/packages">
                  <button className={styles.TakeActionBtn}>
                    Subscribe to Take Action
                  </button>
                </Link>
              ) : tips.enrollmentStatus === 'enroll' ? (
                <button className={styles.TakeActionBtn} onClick={enroll}>
                  Enroll to Take Action
                </button>
              ) : (
                <div></div>
              )}
              {expireDateNull || expire_date < todayDate ? (
                <div></div>
              ) : (
                tips.lastEnrollment && (
                  <div className={styles['details-btn']}>
                    <TipsDetailsPracticeAction
                      slug={tips.slug}
                      tips={tips}
                      lastEnrollment={tips.lastEnrollment}
                      enrollmentStatus={tips.enrollmentStatus}
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <TipListItem
            disableLink
            previewOnly={false}
            hideTitle={true}
            tips={tips}
            singleView={true}
            hideMeta={true}
          />
          <div className={styles.TipsActionSmaller}>
            {props.tipsDetailsActions}
          </div>
          <div>
            <audio controls>
              <track kind="captions" src="" label="English captions" />
              <source src={tips.audio_url} type="audio/mpeg" />
            </audio>
          </div>

          <h4>Reasons to Read</h4>
          <div
            className={styles.Description}
            dangerouslySetInnerHTML={{ __html: tips.reasons_to_read }}
          />
          <h4>Introduction</h4>
          <div
            className={styles.Description}
            dangerouslySetInnerHTML={{ __html: tips.description?.content }}
          />
          <h4>Summary & Key Takeaways</h4>
          <div
            className={styles.Description}
            dangerouslySetInnerHTML={{ __html: tips.summary }}
          />
          <h4>Stories & Experiments</h4>
          <div
            className={styles.Description}
            dangerouslySetInnerHTML={{ __html: tips.stories }}
          />
          <h4>Learnings</h4>
          <div
            className={styles.Description}
            dangerouslySetInnerHTML={{ __html: tips.learnings }}
          />
          <div className={styles.AttachmentToolbarContainer}>
            {isAuthenticated() && (
              <AttachmentToolbar attachments={tips.description.attachments} />
            )}
          </div>
          {tips.tasks?.length > 0 && <TasksOnDetailedTip tasks={tips.tasks} />}
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
        {/* <AuthorOnDetailedTip tipsSlug={tips.slug} author={tips.author} />*/}
        <div className={styles.TipsActionLarger}>
          {props.tipsDetailsActions}
        </div>
      </div>
      {commentsWindowCloser}
    </div>
  );
};

export default TipsDetails;
