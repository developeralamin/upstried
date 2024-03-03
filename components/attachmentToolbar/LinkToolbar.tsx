import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dropdown } from 'antd';
import React, { useState } from 'react';
import { LinkAttachInterfaceWithIndex } from '../../interfaces/attachment.interface';
import styles from './AttachmentToolbar.module.scss';
import LinkModal from './LinkModal';

export interface LinkToolbarProps {
  attachments: Array<LinkAttachInterfaceWithIndex>;
  attachmentsCount: number;
  isEditMode: boolean;
  onRemove?: (attachment: LinkAttachInterfaceWithIndex) => void;
}

const LinkToolbar: React.FC<LinkToolbarProps> = (props) => {
  const [visible, setVisible] = useState(false);
  const onCloseHandler = () => {
    setVisible(false);
  };
  return (
    <div className={styles.AttachmentItemToolbar}>
      <Dropdown
        visible={visible}
        overlay={
          <div className={styles.LinksContainer}>
            <LinkModal
              isEditMode={props.isEditMode}
              onClose={onCloseHandler}
              onRemove={props.onRemove}
              attachments={props.attachments}
            />
          </div>
        }
        trigger={['click']}
      >
        <Button onClick={() => setVisible(!visible)} className={styles.Button}>
          <FontAwesomeIcon icon={faLink} />
          <span className={styles.Count}>{props.attachmentsCount}</span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default LinkToolbar;
