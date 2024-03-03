import Image from 'next/image';
import React from 'react';
import styles from './TipsThumbnail.module.scss';

export interface TipsThumbnailProps {
  thumbnail: any;
  altTxt: string;
  height?: string;
}

const TipsThumbnail: React.FC<TipsThumbnailProps> = (props) => {
  return (
    <div className={styles.TipsThumbnail}>
      <div className={styles.MediaWrapper}>
        <div className={styles.ThumbnailWrapper}>
          <img src={props.thumbnail} alt={props.altTxt} />
        </div>
      </div>
    </div>
  );
};

export default TipsThumbnail;
