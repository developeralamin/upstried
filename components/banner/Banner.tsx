/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import ModalVideo from 'react-modal-video';
import { SIGNUP_ROUTE } from '../../config/endpoints';
import { isClientSide } from '../../services/util';
import styles from './Banner.module.scss';
import useTranslation from 'next-translate/useTranslation'

const Banner: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const { t } = useTranslation('banner');
  return (
    <div className={styles.Banner}>
      <div className="container">
        <div className={styles.Wrapper}>
          <div className={styles.Start}>
            <div className={styles.Content}>
              <h1 className="title">
                {t('title')}
                <br />
                success becomes habit.
              </h1>
              <p className="desc">
                Get the best tips in readily actionable format, from experts
                around the world, for every area of life.
              </p>
              <Link href={SIGNUP_ROUTE}>
                <a className={'ant-btn ' + styles.Action}>
                  Get Started
                  <img src="/home/banner/arrow.svg" alt="Icon" />
                </a>
              </Link>
            </div>
          </div>
          <div className={styles.End}>
            <div className={styles.Video}>
              {isClientSide() ? (
                <ModalVideo
                  channel="youtube"
                  autoplay
                  isOpen={isOpen}
                  videoId="LjDbg5D4x90"
                  onClose={() => setOpen(false)}
                />
              ) : null}
              <Button className={styles.Play} onClick={() => setOpen(true)}>
                <img src="/play.svg" alt="Icon" />
              </Button>
            </div>
            <div className={styles.Illustration}>
              <img
                src="/home/banner/1.webp"
                width="259"
                height="259"
                alt="Illustration one"
              />
              <img
                src="/home/banner/2.webp"
                width="165"
                height="165"
                alt="Illustration one"
                className={styles.Illustration2}
              />
              <img
                src="/home/banner/3.webp"
                width="165"
                height="165"
                alt="Illustration one"
                className={styles.Illustration3}
              />
            </div>
          </div>
        </div>
        <img
          src="/home/banner/4.webp"
          width="165"
          height="165"
          alt="Illustration one"
          className={styles.Illustration4}
        />
        <img
          src="/home/banner/5.png"
          alt="Illustration one"
          className={styles.Illustration5}
        />
        <img
          src="/home/banner/6.webp"
          alt="Illustration one"
          className={styles.Illustration6}
        />
        <img
          src="/home/banner/7.png"
          alt="Illustration one"
          className={styles.Illustration7}
        />
      </div>
    </div>
  );
};

export default Banner;
