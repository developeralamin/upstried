import React, { useEffect, useState } from 'react';
import styles from './Task.module.scss';
import { Tooltip, Modal, Table } from 'antd';
import { ServerTaskObjTaskDashboard } from '../../../api/task-dashboard/dataTypes';
import EnrollmentTipsReportAPI from '../../../api/tipsReport/request';
import { TimelineObj } from '../../../api/tipsReport/dataTypes';
import clsx from 'clsx';
import { Pagination } from 'antd';
import { Spin } from 'antd';
import AttachmentToolbar from '../../attachmentToolbar/AttachmentToolbar';

const Dsfn = (props: any) => {
  const { task } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      Done {task.meta.done} <br /> Skip {task.meta.skipped} <br /> Fail{' '}
      {task.meta.failed} <br /> No Action{' '}
      {task.meta.total - task.meta.done - task.meta.skipped - task.meta.failed}
    </div>
  );
};

const DataTable = (props: any) => {
  const { enrollmentId, taskId, setTotal, page, setSpinning } = props;
  const [timelines, setTimeLines] = useState([]);

  useEffect(() => {
    setSpinning(true);

    EnrollmentTipsReportAPI.getTaskLogs(enrollmentId, taskId, page)
      .then((res: any) => {
        // console.log('task logs', res.data);
        if (res && res.data) {
          setTimeLines(res.data.data);
          setTotal(res.data.meta.total);
        }
        setSpinning(false);
      })
      .catch((e) => {
        setSpinning(false);
        console.error('error thrown', e);
      });
  }, [page]);

  return (
    <div className={styles.GridContainer}>
      <div
        className={clsx({
          [styles.TableHeader]: true,
          [styles.gridItem]: true,
        })}
      >
        Ex. no.
      </div>
      <div
        className={clsx({
          [styles.TableHeader]: true,
          [styles.gridItem]: true,
        })}
      >
        Start
      </div>
      <div
        className={clsx({
          [styles.TableHeader]: true,
          [styles.gridItem]: true,
        })}
      >
        End
      </div>
      <div
        className={clsx({
          [styles.TableHeader]: true,
          [styles.gridItem]: true,
        })}
      >
        Completion Time
      </div>
      <div
        className={clsx({
          [styles.TableHeader]: true,
          [styles.Status]: true,
          [styles.gridItem]: true,
        })}
      >
        Status
      </div>

      {timelines.map((timeline: TimelineObj, index: number) => {
        return (
          <React.Fragment key={timeline.id}>
            <div
              className={clsx({
                [styles.gridItem]: true,
              })}
            >
              {page * 15 - 15 + index + 1}
            </div>
            <div
              className={clsx({
                [styles.gridItem]: true,
              })}
            >
              {timeline.startDate.format('hh:mmA') + ' '}
              {timeline.startDate.format('DD MMMM, YY')}
            </div>
            <div
              className={clsx({
                [styles.gridItem]: true,
              })}
            >
              {timeline.endDate === '' ? (
                'any time'
              ) : (
                <>
                  {(timeline.endDate as moment.Moment).format('hh:mmA') + ' '}
                  {(timeline.endDate as moment.Moment).format('DD MMMM, YY')}
                </>
              )}
            </div>
            <div
              className={clsx({
                [styles.gridItem]: true,
              })}
            >
              {timeline.completedAt === '' ? (
                'N/A'
              ) : (
                <>
                  {(timeline.completedAt as moment.Moment).format('hh:mmA') +
                    ' '}
                  {(timeline.completedAt as moment.Moment).format(
                    'DD MMMM, YY'
                  )}
                </>
              )}
            </div>
            <div
              className={clsx({
                [styles.gridItem]: true,
                [styles.Status]: true,
              })}
            >
              {timeline.status === 1 && (
                <div
                  className={clsx({
                    [styles.Done]: true,
                  })}
                >
                  <img src="/practice/done.svg" alt="" />
                </div>
              )}
              {timeline.status === 2 && (
                <div
                  className={clsx({
                    [styles.Fail]: true,
                  })}
                >
                  <img src="/practice/fail.svg" alt="" />
                </div>
              )}
              {timeline.status === 3 && (
                <div
                  className={clsx({
                    [styles.Skip]: true,
                  })}
                >
                  <img src="/practice/skip.svg" alt="" />
                </div>
              )}
              {timeline.status === 0 && (
                <div
                  className={clsx({
                    [styles.NoAction]: true,
                  })}
                >
                  <img src="/practice/due.svg" alt="" />
                </div>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
interface TaskProps {
  task: ServerTaskObjTaskDashboard;
  enrollmentId: string;
}
const Task = (props: TaskProps) => {
  const { task, enrollmentId } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChange = (page: number) => {
    // console.log(page);
    setSpinning(true);
    setPage(page);
  };

  const getActionPercentage = (actionCount: number) => {
    return Math.floor((actionCount * 100) / task.meta.total);
  };
  const donePercentage = getActionPercentage(task.meta.done);
  const failPercentage = getActionPercentage(task.meta.failed);
  const skipPercentage = getActionPercentage(task.meta.skipped);
  const noActionPercentage = getActionPercentage(
    task.meta.total - task.meta.done - task.meta.failed - task.meta.skipped
  );

  return (
    <div className={styles.TaskWrapper}>
      <div className={styles.TitleProgressWrapper}>
        <p className={styles.TaskTitle}>{task.title}</p>
        <Modal
          title={null}
          footer={null}
          maskClosable={true}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          closable={false}
          bodyStyle={{ borderRadius: '15px', padding: '17px' }}
          style={{
            minWidth: '40vw',
            left: '-17px',
          }}
        >
          <Spin spinning={spinning}>
            <DataTable
              enrollmentId={enrollmentId}
              taskId={task.id}
              setTotal={setTotal}
              page={page}
              setSpinning={setSpinning}
            />
          </Spin>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              total={total}
              defaultPageSize={15}
              current={page}
              onChange={onChange}
            />
          </div>
        </Modal>
        <div className={styles.ViewProgressContainer}>
          <button className={styles.ViewLogBtn} onClick={showModal}>
            View Log
          </button>
          <Tooltip
            placement="top"
            title={<Dsfn task={task} />}
            overlayStyle={{
              width: '100px',
              fontSize: '9px',
              fontFamily: 'Roboto',
              textAlign: 'center',
            }}
          >
            <div className={styles.ProgressWrapper}>
              <div
                className={styles.p1}
                style={{ width: `${donePercentage}%` }}
              ></div>
              <div
                className={styles.p2}
                style={{ width: `${failPercentage}%` }}
              ></div>
              <div
                className={styles.p3}
                style={{ width: `${skipPercentage}%` }}
              ></div>
              <div
                className={styles.p4}
                style={{ width: `${noActionPercentage}%` }}
              ></div>
            </div>
          </Tooltip>
        </div>
      </div>
      <AttachmentToolbar attachments={task.attachments as any} />
    </div>
  );
};

export default Task;
