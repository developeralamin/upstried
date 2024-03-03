import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { isMobile } from '../../services/util';
import styles from './MobileDetect.module.scss';

const MobileDetect = () => {
  useEffect(() => {
    const mobileDetectNotification = sessionStorage.getItem(
      'mobileDetectNotification'
    );
    if (isMobile() && !mobileDetectNotification) {
      setMobile(true);
    }
  }, []);
  const [mobile, setMobile] = useState(false);
  const notNowHandler = () => {
    setMobile(false);
    sessionStorage.setItem('mobileDetectNotification', 'shown');
  };
  const goToAppHandler = () => {
    window.location.href = 'https://dl.virtunus.com/app_links';
  };
  if (mobile) {
    return (
      <div className={styles.MobileDetect}>
        <h4>Tips are better on the app</h4>
        <div className={styles.Actions}>
          <Button className={styles.BtnOne} onClick={notNowHandler}>
            Not now
          </Button>
          <Button className={styles.BtnTwo} onClick={goToAppHandler}>
            Switch to the app
          </Button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default MobileDetect;
