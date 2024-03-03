import { Modal, Tooltip, message } from 'antd';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TipsAPI from '../../../api/books/request';
import { HistoyObj } from '../../../api/enrollment-history/dataTypes';
import EnrollmentHistory from '../../../api/enrollment-history/request';
import { HTTP_SUCCESS_STATUS } from '../../../config/api';
import { TipsEnrollmentStatus } from '../../../enums/Tips.enum';
import { getAuthUsername } from '../../../services/authentication';
import { getPendingEnrollment } from '../../../services/pendingActions';
import SocialShare from '../../socialShare/SocialShare';
import { TipsFooterProps } from './TipsFooter.d';
import styles from './TipsFooter.module.scss';

const TipsFooter: React.FC<TipsFooterProps> = (props) => {
  const [reacted, setReacted] = useState(false);
  const [totalReactions, setTotalReactions] = useState(0);
  const [enrolling, setEnrolling] = useState(false);
  const [reactionLoading, setReactionLoading] = useState(false);
  const [toolTipVisible, setToolTipVisible] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState(
    TipsEnrollmentStatus.Enroll
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [enrollmentHistory, setEnrollmentHistory] = useState<HistoyObj[]>([]);

  const router = useRouter();

  const [checkDetails, setCheckDetails] = useState(false);

  const {
    tipsTotalEnrollments,
    tipsEnrolled,
    tipsLastEnrollment,
    detailsLink,
    title,
    tipsKeySlug,
    tipsKeyId,
    pacticeUrl,
    imageAttachmentUrl,
    tipsAuthor,
    tipsCategory,
  } = props;

  const username = getAuthUsername();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  interface HistoryResposne {
    data: HistoyObj[];
  }

  function onTipsDetailsClick() {
    showModal();
    EnrollmentHistory.getEnrollmentHistoy(tipsKeyId, username)
      .then((res: HistoryResposne | undefined) => {
        // console.log(res);
        if ((res as HistoryResposne)?.data.length >= 1)
          setEnrollmentHistory((res as HistoryResposne).data);
      })
      .catch((e) => {
        message.error('something went wrong');
        console.error(e);
      });
  }

  useEffect(() => {
    if (!router) return;

    if (
      router.route === '/authors/[username]' &&
      router.query.tab === 'enrolled-tips'
    ) {
      setCheckDetails(true);
    }
    if (
      router.route === '/authors/[username]' &&
      router.query.tab != 'enrolled-tips'
    ) {
      setCheckDetails(false);
    }
  }, [router]);

  useEffect(() => {
    const { tipsReaction, tipsTotalReactions } = props;
    setReacted(tipsReaction);
    setTotalReactions(tipsTotalReactions);
    setEnrolled(tipsEnrolled);
    setEnrollmentStatus(props.tipsEnrollmentStatus);
  }, [props]);

  useEffect(() => {
    if (getPendingEnrollment(tipsKeySlug)) {
      enroll();
    }
  }, []);

  const { t } = useTranslation('tips');
  const enroll = async () => {
    try {
      setEnrolling(true);
      setEnrolled(true);
      setEnrollmentStatus(TipsEnrollmentStatus.Enrolled);
      setTimeout(() => {
        setEnrolling(false);
      }, 500);
      const response = await TipsAPI.enroll({ slug: tipsKeySlug });
      message.success(t('enroll.message.success'));
      if (response && response.status === HTTP_SUCCESS_STATUS) {
        router.push(response.data?.practiceUrl as string);
      }
    } catch (error) {
      console.error(error);
      setEnrolled(false);
      setEnrollmentStatus(TipsEnrollmentStatus.Enroll);
    }
  };

  const doReact = async () => {
    try {
      setReactionLoading(true);
      setReacted((prevState: any) => {
        const reacted = !prevState;
        setTotalReactions(reacted ? totalReactions + 1 : totalReactions - 1);
        return reacted;
      });
      setTimeout(() => setReactionLoading(false), 500);
      await TipsAPI.doThumbsUp({ id: tipsKeyId });
    } catch (error) {
      console.error(error);
      setReacted((prevState: any) => {
        const reacted = !prevState;
        setTotalReactions(
          prevState
            ? totalReactions
              ? totalReactions - 1
              : 0
            : totalReactions + 1
        );
        return reacted;
      });
    }
  };

  return (
    <div className={styles.TipsFooter}>
      <div className={styles.Start}>
        <Tooltip title={'Like tips'}>
          <button
            onClick={doReact}
            className={clsx(
              reactionLoading && styles.LikeLoading,
              reacted && styles.ThumbsUpActive
            )}
          >
            <span className="icon1">
              <i className="icon-Vector-9"></i>
            </span>
            {totalReactions}
          </button>
        </Tooltip>
        <Tooltip title={'Total enrollment'}>
          <button>
            <span className="icon2">
              <i className="icon-Subtract-1"></i>
            </span>
            {tipsTotalEnrollments}
          </button>
        </Tooltip>
        <SocialShare
          title={title}
          detailsLink={detailsLink}
          toolTipVisible={toolTipVisible}
          setToolTipVisible={setToolTipVisible}
        />
      </div>
      <Modal
        title={null}
        footer={null}
        maskClosable={true}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        bodyStyle={{ borderRadius: '10px', padding: '0px' }}
        style={{
          minWidth: '30vw',
          position: 'relative',
          top: '20vh',
        }}
        wrapClassName={styles.ModalWrapper}
      >
        <div className={styles.TipsThumbnail__image}>
          <img src={imageAttachmentUrl} alt="coverImg" />
        </div>
        <div className={styles.ModalBodyWrapper}>
          <p className={styles.TipsTitile}>{title}</p>
          <p className={styles.AuthorCategory}>
            by {tipsAuthor} . {tipsCategory}
          </p>
          <p className={styles.TotalEnrollments}>
            {' '}
            Total enrollment: {enrollmentHistory.length}
          </p>
          {enrollmentHistory.map((enrollment) => {
            return (
              <EnrollmentHistoryItem
                key={enrollment.id}
                enrollment={enrollment}
              />
            );
          })}
        </div>
      </Modal>
      <div className={styles.End}>
        {enrollmentStatus === TipsEnrollmentStatus.Enroll ? (
          <div>
            {/* <Button
            className={`enrollment-status-${enrollmentStatus.toLowerCase()} enrollment-status`}
            onClick={enroll}
            loading={enrolling}
          >
            {enrollmentStatus}
          </Button> */}
          </div>
        ) : ((enrollmentStatus as string) === 'completed' ||
            (enrollmentStatus as string) === 'incomplete') &&
          checkDetails ? (
          <button
            className={styles.TipsDetailsBtn}
            onClick={onTipsDetailsClick}
          >
            <svg
              width="8"
              height="6"
              viewBox="0 0 8 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.64 0L7.14 2.5V3.2L4.64 5.7L3.93 5L5.57 3.35H0V2.35H5.57L3.92 0.7L4.64 0Z"
                fill="currentColor"
              />
            </svg>
            Details
          </button>
        ) : (
          <div>
            {/*   <div
              className={`enrollment-status-${enrollmentStatus.toLowerCase()} enrollment-status`}
            >
              <img src={`/tips/status-${enrollmentStatus}.svg`} alt="icon" />
            {enrollmentStatus} 
                </div>
                */}
          </div>
        )}
      </div>
    </div>
  );
};

interface EnrollmentHistoryItemProps {
  enrollment: any;
}
const EnrollmentHistoryItem = (props: EnrollmentHistoryItemProps) => {
  const { status, progress, startDate, endDate, id } = props.enrollment;
  return (
    <div className={styles.EnrollemenContainer}>
      <p className={styles.TimeDHistory}>Time-Date_History</p>
      <div className={styles.ItemMetaWrapper}>
        <p className={styles.MetaField}>Enrollment Date - {startDate}</p>
        <p
          className={clsx({
            [styles.MetaField]: true,
          })}
        >
          Status -{' '}
          <span
            className={clsx({
              [styles.Completed]: status === 'Completed',
              [styles.InComplete]: status === 'InComplete',
              [styles.InProgress]: status === 'In Progress',
            })}
          >
            {status}
          </span>
        </p>
      </div>

      <div className={styles.ItemMetaWrapper}>
        <p className={styles.MetaField}>End Date - {endDate}</p>
        <p
          className={clsx({
            [styles.MetaField]: true,
            [styles.Completed]: status === 'Completed',
            [styles.InComplete]: status === 'InComplete',
            [styles.InProgress]: status === 'In Progress',
          })}
        >
          Completion Progress -{' '}
          <span
            className={clsx({
              [styles.Completed]: status === 'Completed',
              [styles.InComplete]: status === 'InComplete',
              [styles.InProgress]: status === 'In Progress',
            })}
          >
            {progress}%
          </span>
        </p>
      </div>
      {status === 'In Progress' || status === 'Incomplete' ? (
        <Link href={'#'}>
          <a className={styles.PracticeBtn}>Practice</a>
        </Link>
      ) : (
        <Link href={`/books/enrollments/${id}/report`}>
          <a className={styles.ReportBtn}>View Report</a>
        </Link>
      )}
    </div>
  );
};

export default TipsFooter;
