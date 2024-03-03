import React from 'react';
import styles from './TipsAttachment.module.scss';
import { TipsAttachmentProps } from './TipsAttachment.d';
import ReactPlayer from 'react-player';

const TipsAttachment: React.FC<TipsAttachmentProps> = (props) => {
    const { thumbnailObj } = props;
    if (thumbnailObj && thumbnailObj.url) {
        const { url, alt } = thumbnailObj;
        return (
            <div className={styles.TipsThumbnail}>
                <div className={styles.MediaWrapper}>
                    <div className={styles.ThumbnailWrapper}>
                        <img src={url} alt={alt} />
                    </div>
                </div>
            </div>
        );
    }
    const isPlayable =
        props.attachment?.type === 'video' || props.attachment?.type === 'audio';

    return (
        <div className={styles.TipsAttachment}>
            {isPlayable ? (
                <ReactPlayer
                    controls
                    url={props.attachment?.resourceUrl}
                    height="240px"
                    width="100%"
                />
            ) : null}
            {props.attachment?.type === 'image' ? (
                <div className={styles.TipsThumbnail__image}>
                    <img src={props.attachment?.url} alt="previewImage" />
                </div>
            ) : null}
        </div>
    );
};

export default TipsAttachment;
