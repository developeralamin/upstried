import { faTimes, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { LinkAttachInterfaceWithIndex } from '../../interfaces/attachment.interface';
import { strlen } from '../../services/util';
import styles from './AttachmentToolbar.module.scss';

export interface PdfToolbarProps {
  attachments: Array<LinkAttachInterfaceWithIndex>;
  attachmentsCount: number;
  isEditMode: boolean;
  onRemove?: (attachment: LinkAttachInterfaceWithIndex) => void;
}

const VideoToolbar: React.FC<PdfToolbarProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const {onRemove, attachments, isEditMode, attachmentsCount} = props;
  return (
    <div className={styles.AttachmentItemToolbar}>
      <Modal
        title="Image Attachments"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
        width={600}
      >
        <div className="attachmentGallery1">
          {attachments.map((attachment: LinkAttachInterfaceWithIndex, index: number) => {
            return (
              <div className="Attachment Video" key={index}>
                <div className={styles.PdfIcon}>
                  <ReactPlayer
                    url={attachment.url || ''}
                    controls
                    width="100%"
                    height="150px"
                  />
                </div>
                <h5>
                  {' '}
                  {attachment.name
                    ? strlen(attachment.name, 30)
                    : strlen(attachment.url || '', 30)}
                </h5>
                {isEditMode && (
                  <Button
                    className={styles.Close}
                    onClick={() => onRemove ? onRemove(attachment) : null}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </Modal>
      <Button onClick={() => setVisible(true)} className={styles.Button}>
        <FontAwesomeIcon icon={faVideo} />
        <span className={styles.Count}>{attachmentsCount}</span>
      </Button>
    </div>
  );
};

export default VideoToolbar;
