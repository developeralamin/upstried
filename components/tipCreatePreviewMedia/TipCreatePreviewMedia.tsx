/* eslint-disable jsx-a11y/media-has-caption */
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import styles from './TipCreatePreviewMedia.module.scss';

export interface TipCreatePreviewMediaProps {
  file: any;
  onRemove: any;
  media?: any;
}

const TipCreatePreviewMedia: React.SFC<TipCreatePreviewMediaProps> = (
  props
) => {
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (props.file.uid) {
      const previewUrl = URL.createObjectURL(props.file);
      setPreview(previewUrl);
    }
    if (props.media?.url && !props.file.uid) {
      const previewUrl = props.media.url;
      setPreview(previewUrl);
    }
  }, [props]);
  const ExistedMedia = (
    <>
      {props.media?.type === 'video' ? (
        <video width="100%" src={preview} controls></video>
      ) : (
        ''
      )}
      {props.media?.type === 'image' ? <img src={preview} alt="Preview" /> : ''}
    </>
  );
  return (
    <div className={styles.TipCreatePreviewMedia}>
      <div className={styles.MediaWrapper}>
        {!props.file.uid ? ExistedMedia : ''}
        {props.file && props.file.type && props.file.type.includes('video') ? (
          <video width="100%" src={preview} controls></video>
        ) : (
          ''
        )}
        {props.file && props.file.type && props.file.type.includes('image') ? (
          <img src={preview} alt="Preview" />
        ) : (
          ''
        )}
        <Button onClick={() => props.onRemove()}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
    </div>
  );
};

export default TipCreatePreviewMedia;
