import { Button, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import TipsAPI from '../../api/books/request';
import { TipsInterface } from '../../interfaces/tips.interface';
import styles from './ReportTips.module.scss';

export interface ReportTipsProps {
  tipsSlug: string;
}

const ReportTips: React.FC<ReportTipsProps> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [report, setReport] = useState('');

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const reportTips = async () => {
    const response = await TipsAPI.report({
      slug: props.tipsSlug,
      report,
    });
    if (response.status === 200) {
      const reportedReport = response.data;
      setIsModalVisible(false);
      setReport('');
      message.success({
        duration: 10,
        key: 'report-tips',
        content: (
          <>
            {response.message}
            <Button
              type="link"
              onClick={async () => {
                message.destroy('report-tips');
                const response = await TipsAPI.undoReport({
                  slug: props.tipsSlug,
                  reportId: reportedReport.id,
                });
                if (response.status === 200) {
                  message.success(response.message);
                  setReport('');
                }
              }}
            >
              Undo Report
            </Button>
          </>
        ),
      });
    }
  };
  const reportOnChangeHandler = (e: any) => {
    setReport(e.target.value);
  };
  return (
    <div className={styles.ReportTips}>
      <Button type="primary" onClick={showModal} className={styles.OpenModal}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.0999 10.1877L9.30619 2.23767C9.11235 1.93443 8.84528 1.68488 8.52962 1.51201C8.21395 1.33915 7.85984 1.24854 7.49994 1.24854C7.14004 1.24854 6.78593 1.33915 6.47026 1.51201C6.1546 1.68488 5.88753 1.93443 5.69369 2.23767L0.899941 10.1877C0.730599 10.47 0.638559 10.7919 0.633073 11.121C0.627587 11.4501 0.70885 11.7749 0.868691 12.0627C1.05349 12.3866 1.32098 12.6556 1.64382 12.8423C1.96665 13.029 2.33327 13.1266 2.70619 13.1252H12.2937C12.6642 13.1291 13.0291 13.0353 13.3517 12.8531C13.6744 12.671 13.9432 12.4069 14.1312 12.0877C14.2957 11.7969 14.3796 11.4675 14.3741 11.1334C14.3686 10.7994 14.2739 10.4729 14.0999 10.1877ZM13.0374 11.4689C12.9623 11.598 12.8533 11.7042 12.7222 11.7758C12.5911 11.8474 12.4429 11.8818 12.2937 11.8752H2.70619C2.55695 11.8818 2.40876 11.8474 2.27766 11.7758C2.14657 11.7042 2.03756 11.598 1.96244 11.4689C1.90759 11.3739 1.87871 11.2661 1.87871 11.1564C1.87871 11.0467 1.90759 10.9389 1.96244 10.8439L6.76244 2.88767C6.84869 2.77374 6.96017 2.68134 7.08813 2.61772C7.21608 2.5541 7.35704 2.52099 7.49994 2.52099C7.64284 2.52099 7.7838 2.5541 7.91175 2.61772C8.03971 2.68134 8.15119 2.77374 8.23744 2.88767L13.0312 10.8377C13.0882 10.9329 13.1188 11.0415 13.1199 11.1525C13.121 11.2634 13.0925 11.3726 13.0374 11.4689Z"
            fill="currentColor"
          />
          <path
            d="M7.5 10.625C7.84518 10.625 8.125 10.3452 8.125 10C8.125 9.65482 7.84518 9.375 7.5 9.375C7.15482 9.375 6.875 9.65482 6.875 10C6.875 10.3452 7.15482 10.625 7.5 10.625Z"
            fill="currentColor"
          />
          <path
            d="M7.5 5C7.33424 5 7.17527 5.06585 7.05806 5.18306C6.94085 5.30027 6.875 5.45924 6.875 5.625V8.125C6.875 8.29076 6.94085 8.44973 7.05806 8.56694C7.17527 8.68415 7.33424 8.75 7.5 8.75C7.66576 8.75 7.82473 8.68415 7.94194 8.56694C8.05915 8.44973 8.125 8.29076 8.125 8.125V5.625C8.125 5.45924 8.05915 5.30027 7.94194 5.18306C7.82473 5.06585 7.66576 5 7.5 5Z"
            fill="currentColor"
          />
        </svg>

        <span>Report</span>
      </Button>
      <Modal
        title="Report about this tips"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        className="modal-report"
      >
        <p className="modal-report__text">
          Please tell us why you are reporting about this tips. To learn about
          the code of conducts, please visit to our{' '}
          <a
            href="https://virtunus.com/community-standard/"
            target="_blank"
            rel="noreferrer"
          >
            Community Standards
          </a>
        </p>
        <Input.TextArea
          onChange={reportOnChangeHandler}
          className="modal-report__input"
          value={report}
        />
        <span className="modal-report__rules">minimum 50 charecters</span>
        <div>
          <Button
            disabled={report.length < 50}
            className={
              'modal-report__btn--primary' +
              (report.length < 50 ? ' disabled' : '')
            }
            type="primary"
            onClick={reportTips}
          >
            Report
          </Button>
          <Button
            className="modal-report__btn--link"
            onClick={() => setIsModalVisible(false)}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ReportTips;
