import { faStickyNote, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { LinkAttachInterfaceWithIndex } from '../../interfaces/attachment.interface';
import { strlen } from '../../services/util';
import styles from './AttachmentToolbar.module.scss';

export interface DocsToolbarProps {
  attachments: Array<LinkAttachInterfaceWithIndex>;
  attachmentsCount: number;
  isEditMode: boolean;
  onRemove?: (attachment: LinkAttachInterfaceWithIndex) => void;
}

const DocsToolbar: React.SFC<DocsToolbarProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const {onRemove, attachments, isEditMode, attachmentsCount} = props;
  return (
    <div className={styles.AttachmentItemToolbar}>
      <Modal
        title="Docs Attachments"
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
              <div className="Attachment Pdf" key={index}>
                <a target="_blank" href={attachment.url || ''} rel="noreferrer">
                  <div className="Icon">
                    <FontAwesomeIcon icon={faStickyNote} />
                  </div>
                  <h5>
                    {attachment.name
                      ? strlen(attachment.name, 30)
                      : strlen(attachment.url || '', 30)}
                  </h5>{' '}
                </a>
                {isEditMode && (
                  <Button
                    onClick={() => onRemove ? onRemove(attachment) : null}
                    className="Close"
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
        <FontAwesomeIcon icon={faStickyNote} />
        <span className={styles.Count}>{attachmentsCount}</span>
      </Button>
    </div>
  );
};

export default DocsToolbar;
