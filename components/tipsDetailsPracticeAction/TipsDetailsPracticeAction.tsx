import { Button, message } from 'antd';
import router from 'next/router';
import React from 'react';
import TipsAPI from '../../api/books/request';
import { HTTP_SUCCESS_STATUS } from '../../config/api';
import { TIPS_ROUTE } from '../../config/endpoints';
import { TipsEnrollmentStatus } from '../../enums/Tips.enum';
import { TipsInterface } from '../../interfaces/tips.interface';
import Tips from '../../pages/books/[id]/[slug]';
import styles from './TipsDetailsPracticeAction.module.scss';
import eventHandler from '../../services/analytics';

interface Props {
  slug: string;
  lastEnrollment: any;
  enrollmentStatus: TipsEnrollmentStatus;
  tips: TipsInterface;
}

function TipsDetailsPracticeAction(props: Props) {
  const { slug, lastEnrollment, tips } = props;

  const practiceAgain = async () => {
    try {
      const response = await TipsAPI.enroll({ slug: slug });
      if (response && response.status === HTTP_SUCCESS_STATUS) {
        router.push(response.data?.practiceUrl as string);
      }
    } catch (error) {
      console.error(error);
      message.error('Something went wrong, please try again');
    }
  };

  return (
    <div>
      {lastEnrollment?.reEnrollable ? (
        <div className={styles.ActionIncomplete}>
 {/*          <Button
            type="primary"
            className={styles.BtnEnrollAgain}
            onClick={practiceAgain}
          >
            <i className="icon-enroll-again"></i>
            Enroll Again
          </Button> */}
          {props.enrollmentStatus !== TipsEnrollmentStatus.Incomplete ? (
            <a href={tips.practiceUrl}>
              <Button shape="round" className={styles.btnPractice}>
                <i className="icon-practice-mode"></i>
                Practice Mode
              </Button>
            </a>
          ) : null}
        </div>
      ) : null}
      {lastEnrollment && !lastEnrollment.reEnrollable ? (
        <a href={tips.practiceUrl}>
          <Button shape="round" className={styles.btnPractice}>
            <i className="icon-practice-mode"></i>
            Practice
          </Button>
        </a>
      ) : null}
    </div>
  );
}

export default TipsDetailsPracticeAction;
