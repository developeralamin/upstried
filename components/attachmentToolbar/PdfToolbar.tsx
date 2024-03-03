import { faFilePdf, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { LinkAttachInterfaceWithIndex } from '../../interfaces/attachment.interface';
import { strlen } from '../../services/util';
import styles from './AttachmentToolbar.module.scss';

export interface PdfToolbarProps {
  attachments: Array<LinkAttachInterfaceWithIndex>;
  attachmentsCount: number;
  isEditMode: boolean;
  onRemove?: (attachment: LinkAttachInterfaceWithIndex) => void;
}

const PdfToolbar: React.FC<PdfToolbarProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const {onRemove, attachments, isEditMode, attachmentsCount} = props;
  const removeAttachment = (attachment: LinkAttachInterfaceWithIndex) => {
    onRemove ? onRemove(attachment) : null;
  };
  return (
    <div className={styles.AttachmentItemToolbar}>
      <Modal
        title="PDF Attachments"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        width={600}
        footer={null}
      >
        <div className="attachmentGallery1">
          {attachments.map((attachment: LinkAttachInterfaceWithIndex, index: number) => {
            return (
              <div className="Attachment Pdf" key={index}>
                <div className={styles.PdfIcon}>
                  <FontAwesomeIcon icon={faFilePdf} />
                </div>
                <a target="_blank" href={attachment.url || ''} rel="noreferrer">
                  <h5>
                    {' '}
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
        <FontAwesomeIcon icon={faFilePdf} />
        <span className={styles.Count}>{attachmentsCount}</span>
      </Button>
    </div>
  );
};

export default PdfToolbar;
