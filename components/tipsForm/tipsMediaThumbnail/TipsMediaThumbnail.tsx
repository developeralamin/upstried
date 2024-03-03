import { Button } from 'antd';
import React from 'react';
import { TipsAttachmentContentTypes } from '../../../enums/Tips.enum';
import { TipsAttachmentInterface } from '../../../interfaces/tips.interface';
import styles from './TipsMediaThumbnail.module.scss';
export interface TipsMediaThumbnailProps {
  attachment: TipsAttachmentInterface;
  onVideoThumbnailChange: (media: any) => void;
  onThumbnailRemove: (media: any) => void;
}

const TipsMediaThumbnail: React.FC<TipsMediaThumbnailProps> = (props) => {
  const { attachment } = props;
  return (
    <div className={styles.TipsMediaThumbnail}>
      {attachment.url ? (
        <div className={styles.VideoAttachment}>
          <div className={styles.Actions}>
            {(attachment.type === TipsAttachmentContentTypes.Video
              || attachment.type === TipsAttachmentContentTypes.Audio) && (
                <Button
                  onClick={() => props.onVideoThumbnailChange(attachment)}
                >
                  <img src="/icons/title-attachment-toggler.png" alt="Icon" />
                </Button>
              )}
            <Button onClick={() => props.onThumbnailRemove(attachment)}>
              <img src="/icons/title-attachment-close.png" alt="Icon" />
            </Button>
          </div>
          <figure>
            <img src={attachment.url} alt="Preview" />
            {attachment.vendor && (
              <figcaption>{attachment.vendor}</figcaption>
            )}
          </figure>
          <div className={styles.Link}>{attachment.resourceUrl}</div>
        </div>
      ) : null}
    </div>
  );
};

export default TipsMediaThumbnail;
