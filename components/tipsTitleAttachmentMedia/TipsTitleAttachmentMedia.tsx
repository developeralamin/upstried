import React from 'react';
import ReactPlayer from 'react-player';
import styles from './TipsTitleAttachmentMedia.module.scss';
import Image from 'next/image';
export interface TipsTitleAttachmentMediaProps {
  media: any;
  height?: string;
}

const TipsTitleAttachmentMedia: React.FC<TipsTitleAttachmentMediaProps> = (
  props
) => {
  return (
    <div className={styles.TipsTitleAttachmentMedia}>
      {props.media &&
      (props.media.type === 'video' || props.media.type === 'audio') ? (
        <ReactPlayer
          controls
          url={props.media.resourceUrl}
          height="240px"
          width="100%"
        />
      ) : null}
      {props.media && props.media.type === 'image' ? (
        <div className={styles.MediaWrapper}>
          <div className={styles.ThumbnailWrapper}>
            <img src={props.media.url} alt="previewImage" />
          </div>

          {/* <Image
            src={props.media.url}
            alt="previewImage"
            height={420}
            width={800}
            layout="responsive"
          /> */}
        </div>
      ) : null}
    </div>
  );
};

export default TipsTitleAttachmentMedia;
