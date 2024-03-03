import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'antd';
import { LinkAttachInterfaceWithIndex } from '../../interfaces/attachment.interface';
import { strlen } from '../../services/util';
import styles from './LinkModal.module.scss';
export interface LinkModalProps {
  attachments: Array<LinkAttachInterfaceWithIndex>;
  onRemove?: (attachment: LinkAttachInterfaceWithIndex) => void;
  onClose: () => void;
  isEditMode: boolean;
}

const LinkModal: React.FC<LinkModalProps> = (props) => {
  const { onRemove, onClose, isEditMode, attachments } = props;
  const removeAttachment = (ev: any, attachment: LinkAttachInterfaceWithIndex) => {
    ev.preventDefault();
    onRemove ? onRemove(attachment) : null;
  };
  const closeModal = (ev: any) => {
    ev.preventDefault();
    onClose();
  };
  return (
    <div className={styles.LinkModal}>
      <div className={styles.Header}>
        <div className={styles.Title}>Attachments</div>
        <div className={styles.LinkModal__header__close}>
          <button
            onClick={(ev) => closeModal(ev)}
            className={styles.Close__button}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
      <div className={styles.Body}>
        <div className={styles.Links}>
          {attachments.map((attachment: LinkAttachInterfaceWithIndex, index: number) => {
            return (
              <div key={index} className={styles.Links__link}>
                <div className={styles.Links__link__url}>
                  <a href={attachment.url || '' } target='_blank'>
                    <Tooltip title={attachment.url}>{strlen(attachment.url || '', 25)}</Tooltip>
                  </a>
                </div>
                {isEditMode && (
                  <div className={styles.Links__link__delete}>
                    <button onClick={(ev) => removeAttachment(ev, attachment)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
