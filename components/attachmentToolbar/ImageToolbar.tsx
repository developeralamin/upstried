import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React from 'react';
import { useState } from 'react';
import styles from './AttachmentToolbar.module.scss';
import { Modal, Button } from 'antd';
import { strlen } from '../../services/util';
import { LinkAttachInterfaceWithIndex } from '../../interfaces/attachment.interface';
export interface ImageToolbarProps {
  attachments: Array<LinkAttachInterfaceWithIndex>;
  attachmentsCount: number;
  isEditMode: boolean;
  onRemove?: (attachment: LinkAttachInterfaceWithIndex) => void;
}

const ImageToolbar: React.FC<ImageToolbarProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const {onRemove, attachments, isEditMode, attachmentsCount} = props;
  const removeAttachment = (attachment: LinkAttachInterfaceWithIndex) => {
    onRemove ? onRemove(attachment) : null;
  };
  return (
    <div className={styles.AttachmentItemToolbar}>
      <Modal
        title="Image Attachments"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        width={600}
        footer={null}
      >
        <div className="attachmentGallery1">
          {attachments.map((attachment: LinkAttachInterfaceWithIndex, index: number) => {
            return (
              <div className="Attachment" key={index}>
                <a target="_blank" href={attachment.url || ''} rel="noreferrer">
                  <div className={styles.ImageBox}>
                    {attachment.url && <img src={attachment.url} alt={attachment.name} />}
                  </div>
                  <h5>
                    {attachment.name
                      ? strlen(attachment.name, 30)
                      : strlen(attachment.url || '', 30)}
                  </h5>
                </a>
                {isEditMode && (
                  <Button
                    className="Close"
                    onClick={() => removeAttachment(attachment)}
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
        <img src="/icons/image.svg" alt="icon" />
        <span className={styles.Count}>{attachmentsCount}</span>
      </Button>
    </div>
  );
};

export default ImageToolbar;
