import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, message, Upload } from 'antd';
import React, { useState } from 'react';
import attachmentHandler from '../../../services/attachmentHandler';
import { getImageSize } from '../../../services/util';
import styles from './TipsUploadablePanel.module.scss';

export interface TipsUploadablePanelProps {
  onClose: () => void;
  onChange: (file: File) => void;
}

const { Dragger } = Upload;

const TipsUploadablePanel: React.FC<TipsUploadablePanelProps> = (props) => {
  const [isUploadActive, setIsUploadActive] = useState(true);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const fileUploaderProps = {
    accept: 'image/png,image/jpeg,image/jpg,image/webp',
    onRemove: () => setAttachmentFile(null),
    beforeUpload: async (file: any) => {
      if (!attachmentHandler.isAcceptedImage(file)) {
        message.error(`${file.name} is not an image file`);
        return false;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        return false;
      }

      setAttachmentFile(file);
      props.onChange(file);
      return false;
    },
    attachmentFile,
  };

  const Uploader = (
    <div className={styles.Upload}>
      <Dragger {...fileUploaderProps}>
        <p className={styles.UploaderTitle + ' ' + 'ant-upload-text'}>
          Drag a file here
        </p>
        <p className="ant-upload-hint">or</p>
        <p className="ant-upload-drag-icon">
          {/* <InboxOutlined /> */}
          <Button className={styles.UploaderBtn}>Browse</Button>
        </p>
        <span className={styles.UploaderRules}>
          Maximum upload file size: 2 mb
        </span>
      </Dragger>
    </div>
  );

  return (
    <div className={styles.TipsUploadablePanel + ' TipsUploadablePanel'}>
      <div className={styles.Nav}>
        <ul>
          <li
            className={isUploadActive ? styles.Active : ''}
            onClick={() => setIsUploadActive(true)}
          >
            Upload
          </li>
        </ul>
        <Button className={styles.CloseUploader} onClick={() => props.onClose()}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
      {isUploadActive && Uploader}
    </div>
  );
};

export default TipsUploadablePanel;
