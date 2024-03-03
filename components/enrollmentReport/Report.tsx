import { G2, Pie } from '@ant-design/plots';
import { Button, Modal, Spin, Switch, message } from 'antd';
import clsx from 'clsx';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ServerTaskObjTaskDashboard } from '../../api/task-dashboard/dataTypes';
import {
  EnrollmentReport,
  EnrollmentReportResponse,
} from '../../api/tipsReport/dataTypes';
import EnrollmentTipsReportAPI from '../../api/tipsReport/request';
import { getAuthUsername } from '../../services/authentication';
import styles from './Report.module.scss';
import Task from './Task/Task';

const ReportContent = () => {
  const router = useRouter();
  const { enrollment_id, token } = router.query;
  const [spinning, setSpinning] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [linkValue, setLinkValue] = useState('');
  const [linkActive, setLinkActive] = useState(false);

  const [enrollment, setEnrollment] = useState<EnrollmentReport | null>(null);
  const [status, setStatus] = useState(1);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!enrollment_id) {
      return;
    }
    EnrollmentTipsReportAPI.getEnrollmentTipsReport(
      enrollment_id as string,
      token as string
    )
      .then((res: EnrollmentReportResponse | undefined) => {
        // console.log((res as EnrollmentReportResponse).data);
        if (res && (res as EnrollmentReportResponse).data) {
          setEnrollment((res as EnrollmentReportResponse).data);
          setLinkActive((res as EnrollmentReportResponse).data.sharingEnable);
          setLinkValue((res as EnrollmentReportResponse).data.sharingUrl || '');
          setSpinning(false);
        }
      })
      .catch((e) => {
        setSpinning(false);
        if (e.response.status === 403) {
          setStatus(403);
        }
      });
  }, [enrollment_id]);
  const G = G2.getEngine('canvas');

  //null
  if (enrollment === null && status === 1) {
    return (
      <div className={styles.CenterDiv}>
        <Spin spinning={spinning}></Spin>
      </div>
    );
  }
  if (enrollment === null && status === 403) {
    return <Error statusCode={403} />;
  }

  const data = [
    {
      type: 'Done',
      value: enrollment?.done,
    },
    {
      type: 'Skipped',
      value: enrollment?.skipped,
    },
    {
      type: 'Failed',
      value: enrollment?.failed,
    },
    {
      type: 'No Activity',
      value: enrollment ? enrollment?.total - enrollment?.completed : 0,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.67,
    color: ['#3161F1', '#F1B920', '#FF174F', '#BFBFBF'],
    label: {
      type: 'spider',
      labelHeight: 28,
      formatter: (data: any, mappingData: any) => {
        const group = new G.Group({});

        group.addShape({
          type: 'text',
          attrs: {
            x: 10,
            y: 8,
            text: `${Math.floor(data.percent * 100)}% ${data.type} - ${
              data.value
            } Tasks`,
            fill: mappingData.color,
          },
        });

        return group;
      },
    },
    legend: {
      position: 'bottom',
      marker: {
        style: {
          r: 6.5,
        },
      },
    },
  };

  function onShareClick(checked: boolean) {
    if (checked) {
      EnrollmentTipsReportAPI.generateAccessToken(enrollment_id as string)
        .then((res: any) => {
          if (res && res.data) {
            setLinkValue(res.data.sharing_url);
            setLinkActive(true);
          } else {
            message.error('error occured');
          }
        })
        .catch((e) => {
          message.error('error occured');
          console.error(e);
        });
    } else {
      EnrollmentTipsReportAPI.disableAccessLink(enrollment_id as string)
        .then((res: any) => {
          if (res) {
            setLinkActive(false);
          } else {
            message.error('error occured');
          }
        })
        .catch((e) => {
          message.error('error occured');
          console.error(e);
        });
    }
  }
  function onCopy() {
    message.success('Link copied successfully');
    navigator.clipboard.writeText(linkValue);
  }

  return (
    <div className="container">
      <div className={styles.Content}>
        <h1 className={styles.TipsTitle}>{enrollment?.tipsTitle}</h1>
        <div className={styles.EnrolleeDetailsWrapper}>
          <div>
            <p className={styles.AuthorName}>
              Tips by {enrollment ? enrollment.tipsAuthor : null}
            </p>
            <p className={styles.AuthorName}>
              Enrolled by{' '}
              <span className={styles.EnrolleeName}>
                {enrollment ? enrollment.enrolleeName : null}
              </span>
            </p>
            <Link
              href={`/authors/${
                enrollment ? enrollment.enrolleeUsername : null
              }`}
            >
              <a className={styles.Profile}>Back to Profile</a>
            </Link>
          </div>
          <a
            href={`/book/${enrollment?.tipsId}/${enrollment?.tipsSlug}/details`}
          >
            <Button shape="round" className={styles.BtnDetails}>
              <i className="icon-Vector-2"></i> View Details
            </Button>
          </a>
        </div>
        <div className={styles.EnrolleeDetailsWrapper}>
          <div>
            <h1 className={styles.TipsReport}>TIPS - Report</h1>
            <p
              className={clsx({
                [styles.CompletionStatus]: true,
                [styles.InComplete]: enrollment?.status === 'InComplete',
                [styles.Completed]: enrollment?.status === 'Completed',
                [styles.InProgress]: enrollment?.status == 'In Progress',
              })}
            >
              Status -{' '}
              <span className={styles.EnrolleeName}>{enrollment?.status}</span>
            </p>

            <p
              className={clsx({
                [styles.CompletionStatus]: true,
                [styles.InComplete]: enrollment?.status === 'InComplete',
                [styles.Completed]: enrollment?.status === 'Completed',
                [styles.InProgress]: enrollment?.status == 'In Progress',
              })}
            >
              Completion Progress -{' '}
              <span className={styles.EnrolleeName}>
                {enrollment?.completionProgress}%
              </span>
            </p>
            <p className={styles.CompletionStatus}>
              Enrollment Session - {enrollment?.enrollmentSession}
            </p>
          </div>
          {enrollment?.enrolleeUsername === getAuthUsername() && (
            <Button
              shape="round"
              className={styles.BtnDetails}
              onClick={showModal}
            >
              <svg
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 12.3998C12.3667 12.3998 11.8 12.6498 11.3667 13.0415L5.425 9.58317C5.46667 9.3915 5.5 9.19984 5.5 8.99984C5.5 8.79984 5.46667 8.60817 5.425 8.4165L11.3 4.9915C11.75 5.40817 12.3417 5.6665 13 5.6665C14.3833 5.6665 15.5 4.54984 15.5 3.1665C15.5 1.78317 14.3833 0.666504 13 0.666504C11.6167 0.666504 10.5 1.78317 10.5 3.1665C10.5 3.3665 10.5333 3.55817 10.575 3.74984L4.7 7.17484C4.25 6.75817 3.65833 6.49984 3 6.49984C1.61667 6.49984 0.5 7.6165 0.5 8.99984C0.5 10.3832 1.61667 11.4998 3 11.4998C3.65833 11.4998 4.25 11.2415 4.7 10.8248L10.6333 14.2915C10.5917 14.4665 10.5667 14.6498 10.5667 14.8332C10.5667 16.1748 11.6583 17.2665 13 17.2665C14.3417 17.2665 15.4333 16.1748 15.4333 14.8332C15.4333 13.4915 14.3417 12.3998 13 12.3998ZM13 2.33317C13.4583 2.33317 13.8333 2.70817 13.8333 3.1665C13.8333 3.62484 13.4583 3.99984 13 3.99984C12.5417 3.99984 12.1667 3.62484 12.1667 3.1665C12.1667 2.70817 12.5417 2.33317 13 2.33317ZM3 9.83317C2.54167 9.83317 2.16667 9.45817 2.16667 8.99984C2.16667 8.5415 2.54167 8.1665 3 8.1665C3.45833 8.1665 3.83333 8.5415 3.83333 8.99984C3.83333 9.45817 3.45833 9.83317 3 9.83317ZM13 15.6832C12.5417 15.6832 12.1667 15.3082 12.1667 14.8498C12.1667 14.3915 12.5417 14.0165 13 14.0165C13.4583 14.0165 13.8333 14.3915 13.8333 14.8498C13.8333 15.3082 13.4583 15.6832 13 15.6832Z"
                  fill="currentColor"
                />
              </svg>
              Share Report
            </Button>
          )}

          <Modal
            title={null}
            footer={null}
            maskClosable={true}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            closable={false}
            bodyStyle={{ borderRadius: '10px' }}
            style={{
              minWidth: '46vw',
              position: 'relative',
              top: '20vh',
            }}
          >
            <div className={styles.ShareReport}>
              <p className={styles.ReportText}>Share Report</p>

              <Switch checked={linkActive} onChange={onShareClick} />
            </div>
            <p className={styles.ShareHintText}>
              Anyone with the link can view this report
            </p>
            <div className={styles.InputLinkWrapper}>
              <input
                className={clsx({
                  [styles.inputField]: true,
                  [styles.InputDisabledBackground]: !linkActive,
                })}
                type="text"
                value={linkValue}
                readOnly
                disabled={linkActive}
              />
              <button
                disabled={!linkActive}
                onClick={onCopy}
                className={clsx({
                  [styles.ShareLinkBtn]: true,
                  [styles.InputDisabledBackground]: !linkActive,
                })}
              >
                Copy Link
              </button>
            </div>
          </Modal>
        </div>
        <div className="PieChart">
          {/* @ts-expect-error: though legend accepts false, still ts throws error */}
          <Pie {...config} />
        </div>

        <p className={styles.ListTasks}>List of Tasks</p>
        <hr className={styles.HzLine}></hr>

        {enrollment?.tasks && enrollment?.tasks.length > 0 ? (
          enrollment.tasks.map((task: ServerTaskObjTaskDashboard) => (
            <Task
              key={task.id}
              task={task}
              enrollmentId={enrollment?.enrollmentId}
            />
          ))
        ) : (
          <p>No tasks available</p>
        )}
        {/* {enrollment?.tasks.map((task: ServerTaskObjTaskDashboard) => {
          return (
            <Task
              key={task.id}
              task={task}
              enrollmentId={enrollment?.enrollmentId}
            />
          );
        })} */}
      </div>
    </div>
  );
};

export default ReportContent;
