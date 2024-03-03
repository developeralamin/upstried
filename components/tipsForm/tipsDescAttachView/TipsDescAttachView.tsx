import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { LinkAttachInterface } from '../../../interfaces/attachment.interface';
import { strlen } from '../../../services/util';
import styles from './TipsDescAttachView.module.scss';

export interface TipsDescAttachViewProps {
  attachments: Array<LinkAttachInterface>;
  onRemove: (index: number) => void;
}

const TipsDescAttachView: React.FC<TipsDescAttachViewProps> =
  (props) => {
    const { attachments, onRemove } = props;
    const getLinkName = (link: string) => {
      if (!link) return '';
      const regex = /^(?:https?:\/\/)?(?:[^@/\n]+@)?(?:www\.)?([^:/\n]+)/gm;
      const result = regex.exec(link);
      if (result) {
        return strlen(result[0], 35);
      }
      return '';
    };
    return (
      <div className={styles.TipsDescAttachView}>
        {attachments.map((item: LinkAttachInterface, index: number) => {
          return (
            <div
              className={styles.TipsDescAttachView__item}
              key={item.uuid}
            >
              <Tooltip title={item.name || item.url}>
                {item.name ? strlen(item.name, 35) : getLinkName(item.url || '')}
              </Tooltip>
              <Button
                className={styles.Remove}
                onClick={() => onRemove(index)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            </div>
          );
        })}
      </div>
    );
  };

export default TipsDescAttachView;
