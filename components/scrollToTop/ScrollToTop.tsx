import styles from './ScrollToTop.module.scss';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTop: React.FC = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setActive(window.scrollY > 400);
    });
  }, []);

  const scroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {active ? (
        <Button onClick={scroll} className={styles.ScrollToTop}>
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
      ) : null}
    </>
  );
};

export default ScrollToTop;
