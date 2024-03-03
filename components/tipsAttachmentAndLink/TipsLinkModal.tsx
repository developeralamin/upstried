import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Input, message } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import {
  TIP_CREATE_DESCRIPTION_LINK_INVALID_MESSAGE,
  TIP_CREATE_DESCRIPTION_LINK_LENGTH_MESSAGE,
} from '../../config/messages';
import styles from './TipsAttachmentAndLink.module.scss';

export interface TipsLinkModalProps {
  onCloseModal: any;
  onDone: any;
}

const TipsLinkModal: React.SFC<TipsLinkModalProps> = (props) => {
  const [links, setLinks] = useState<any>([]);
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const isValidLink = (link: string) => {
    if (link.length === 0) {
      return false;
    }
    const regex =
      /(((http:|https:)\/\/)|(www.))[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\\/~+#-]*[\w@?^=%&amp;\\/~+#-])?/;

    return regex.test(link);
  };
  const addLinkHandler = () => {
    if (!link) {
      setError('Please enter a link');
      return;
    }

    if (!isValidLink(link)) {
      message.error(TIP_CREATE_DESCRIPTION_LINK_INVALID_MESSAGE);
      return;
    }

    if (links.length - 1 >= 9) {
      message.error(TIP_CREATE_DESCRIPTION_LINK_LENGTH_MESSAGE);
      return;
    }

    setLinks((prevLinks: any) => [
      ...prevLinks,
      {
        url: link,
        type: 'link',
        file: null,
        uuid: uuidv4(),
      },
    ]);
    setLink('');
  };
  const removeLink = (index: number) => {
    setLinks((prevLinks: any) =>
      prevLinks.filter((link: any, i: number) => i !== index)
    );
  };
  const linkOnchangeHandler = (ev: any) => {
    setError('');
    setLink(ev.target.value);
  };
  const onDoneHandler = () => {
    if (link && !isValidLink(link)) {
      message.error(TIP_CREATE_DESCRIPTION_LINK_INVALID_MESSAGE);
      return;
    }

    let allLinks = [...links];
    if (link) {
      const latestLink = {
        url: link,
        type: 'link',
        file: null,
        uuid: uuidv4(),
      };
      allLinks = [...allLinks, latestLink];
    }
    props.onDone(allLinks);
    setLink('');
    setLinks([]);
  };
  return (
    <div className={styles.TipsLinkModal}>
      <div className={styles.LinkContent}>
        <div className={styles.TipsLinkModalBody}>
          <h2 className={styles.Title}>Add Link</h2>
          <div className={styles.Links}>
            {links?.map((link: any, index: number) => {
              return (
                <div key={index} className={styles.LinkWrapper}>
                  <div className={styles.Link}>{link.url}</div>
                  <Button
                    onClick={() => removeLink(index)}
                    className={styles.LinkClose}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </div>
              );
            })}
          </div>
          <Input
            placeholder="Paste your link here"
            value={link}
            onChange={linkOnchangeHandler}
            onPressEnter={addLinkHandler}
            type="text"
            className={styles.TipsLinkModalInput}
          />
          {error ? <div className="text-error">{error}</div> : ''}
          <Button className={styles.LinkAdd} onClick={addLinkHandler}>
            + Add More
          </Button>
        </div>
        <div className={styles.TipsLinkModalFooter}>
          <Button onClick={props.onCloseModal} className={styles.BtnCancel}>
            Cancel
          </Button>
          <Button onClick={onDoneHandler} type="primary">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TipsLinkModal;
