import { Button, message, Modal, Upload } from 'antd';
import React, { useState } from 'react';
import attachmentHandler from '../../services/attachmentHandler';
import { getUrlFromFile } from '../../services/util';
import styles from './TipsAttachmentAndLink.module.scss';
import LinkModal from './TipsLinkModal';

import { v4 as uuidv4 } from 'uuid';

export interface TipsAttachmentAndLinkProps {
  onLinkAdded: any;
  onAttachmentUploaded: any;
  onError: any;
}

const TipsAttachmentAndLink: React.SFC<TipsAttachmentAndLinkProps> = (
  props
) => {
  const [linkModal, setLinkModal] = useState(false);
  const onCloseModal = () => setLinkModal(false);
  const [fileList, setFileList] = useState<any>([]);
  const onDone = (data: any) => {
    props.onLinkAdded(data);
    setLinkModal(false);
  };

  const fileUploaderProps = {
    onRemove: (file: any) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    multiple: true,
    accept:
      'image/png,image/jpeg,image/jpg,image/webp,audio/wav,audio/mpeg,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.wordprocessingml.template,application/vnd.ms-word.document.macroEnabled.12,application/vnd.ms-excel,application/excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/x-excel,application/x-msexcel,application/vnd.openxmlformats-officedocument.spreadsheetml.template,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.presentationml.template,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.ms-powerpoint',
    beforeUpload: (file: any) => {
      if (!attachmentHandler.isAcceptedType(file)) {
        message.error('Sorry, this type of file is not allowed');
        return;
      }
      const isLt13M = file.size / 1024 / 1024 < 13;
      if (!isLt13M) {
        message.error('Image must smaller than 13MB!');
        return;
      }

      props.onAttachmentUploaded({
        file: file,
        url: getUrlFromFile(file),
        uuid: uuidv4(),
        type: attachmentHandler.getfileType(file.type),
        name: file.name,
      });
      return false;
    },
    fileList,
  };
  return (
    <div className={styles.TipsLinkAndAttachUploader + ' TipsAttachmentAndLink'}>
      <div className={styles.Actions}>
        <Upload {...fileUploaderProps} maxCount={1}>
          <Button className={styles.Actions__item}>
            <img src="/icons/attachment.svg" width="15" alt="icon" />
          </Button>
        </Upload>
        <Button
          className={styles.Actions__item}
          onClick={() => setLinkModal(true)}
        >
          <img src="/icons/link.svg" width="18" alt="icon" />
        </Button>
        <Modal
          footer={null}
          onCancel={() => setLinkModal(false)}
          visible={linkModal}
        >
          <LinkModal onDone={onDone} onCloseModal={onCloseModal} />
        </Modal>
      </div>
    </div>
  );
};

export default TipsAttachmentAndLink;
