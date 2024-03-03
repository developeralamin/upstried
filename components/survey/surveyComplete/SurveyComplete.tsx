import React from 'react';
import {
  APPLE_PLAY_STORE_LINK,
  GOOGLE_PLAY_STORE_LINK,
} from '../../../config/endpoints';
import styles from './SurveyComplete.module.scss';

const SurveyComplete: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.img}>
          <img src="/favicon.ico" alt="Virtunus" width="50px" height="auto" />
        </div>
        <div className={styles.title}>Get Virtunus on your mobile</div>
        <div className={styles.subtitle}>
          Scan the QR code with your phone&apos;s camera to download our free
          app
        </div>
        <div className={styles.badges}>
          <div>
            <a target="blank" href={GOOGLE_PLAY_STORE_LINK}>
              <img
                src="/google-play-badge.svg"
                alt="Virtunus"
                width="120px"
                height="auto"
              />
            </a>
          </div>
          <div>
            <a target="blank" href={APPLE_PLAY_STORE_LINK}>
              <img src="/apple.svg" alt="Virtunus" width="98px" height="auto" />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <img src="/qr_code.png" alt="Virtunus" width="220px" height="auto" />
      </div>
    </div>
  );
};

export default SurveyComplete;
