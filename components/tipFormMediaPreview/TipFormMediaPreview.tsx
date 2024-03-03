/* eslint-disable jsx-a11y/media-has-caption */
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { isImage, isVideo } from '../../services/util';
import styles from './TipFormMediaPreview.module.scss';

export interface TipFormMediaPreviewProps {
  file: any;
  onRemove: any;
  media: any;
}

const TipFormMediaPreview: React.FC<TipFormMediaPreviewProps> = (props) => {
  const [preview, setPreview] = useState('');
  useEffect(() => {
    if (props.media) {
      setPreview(props.media.url);
    }
    if (props.file.uid) {
      const previewUrl = URL.createObjectURL(props.file);
      setPreview(previewUrl);
    }
  }, [props]);

  const Media = (
    <>
      {isVideo(preview) ? (
        <video width="100%" src={preview} controls></video>
      ) : (
        ''
      )}
      {isImage(preview) ? <img src={preview} alt="Preview" /> : ''}
    </>
  );
  const Files = (
    <>
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
    </>
  );
  return (
    <div className={styles.TipFormMediaPreview}>
      <div className={styles.MediaWrapper}>
        {!props.file.type ? Media : ''}
        {props.file.type ? Files : ''}
        <Button onClick={() => props.onRemove()}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
    </div>
  );
};

export default TipFormMediaPreview;
