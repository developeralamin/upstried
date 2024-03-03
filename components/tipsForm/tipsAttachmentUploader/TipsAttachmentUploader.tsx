import { faCamera, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import TipsMediaThumbnail from '../tipsMediaThumbnail/TipsMediaThumbnail';
import TipsUploadablePanel from '../TipsUploadablePanel/TipsUploadablePanel';
import styles from './TipsAttachmentUploader.module.scss';
import clsx from 'clsx';
import { TipsAttachmentContentTypes, TipsAttachmentGeneralTypes } from '../../../enums/Tips.enum';
import { TipsAttachmentInterface } from '../../../interfaces/tips.interface';
import { TipsAttachmentUploaderProps } from './TipsAttachmentUploader.d';
import TipsEmbeddablePanel from '../tipsEmbeddablePanel/TipsEmbeddablePanel';

const TipsAttachmentUploader: React.FC<TipsAttachmentUploaderProps> = (props) => {
  const [attachmentUploadPanel, setAttachmentUploadPanel] = useState(false);
  const [embeddablePanel, setEmbeddablePanel] = useState(false);
  const [preview, setPreview] = useState<TipsAttachmentInterface | null>(
    props.attachment ? { ...props.attachment } : null);
  const attachmentWindowRef = useRef<any>(null);
  const [uploadFor, setUploadFor] = useState<TipsAttachmentGeneralTypes | null>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideWindow);
  }, [attachmentWindowRef]);

  const handleClickOutsideWindow = (event: MouseEvent) => {
    if (
      attachmentWindowRef &&
      attachmentWindowRef.current &&
      !attachmentWindowRef.current.contains(event.target)
    ) {
      setEmbeddablePanel(false);
    }
  };
  const closePanel = () => {
    setAttachmentUploadPanel(false);
    setEmbeddablePanel(false);
  };

  const onEmbeddableAttachmentChange = async (attachment: TipsAttachmentInterface) => {
    setPreview(attachment);
    setEmbeddablePanel(false);
    props.onChange({
      preview: attachment,
      file: null
    });
  };

  const uploadThumbnailForResource = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview((prevAttachment: any) => ({
      ...prevAttachment,
      url,
    }));
    setAttachmentUploadPanel(false);
    props.onChange({
      preview: {
        ...preview,
        url: url,
      },
      file,
    });
    setUploadFor(null);
  }

  const uploadAttachment = (file: File) => {
    const url = URL.createObjectURL(file);
    const previewObj: TipsAttachmentInterface = { url, type: TipsAttachmentContentTypes.Image };
    setPreview(previewObj);
    setAttachmentUploadPanel(false);
    props.onChange({
      preview: previewObj,
      file,
    });
  }

  const onFileUploadedHandler = (file: File) => {
    uploadFor === TipsAttachmentGeneralTypes.Embeddable
      ? uploadThumbnailForResource(file) : uploadAttachment(file);

  }

  const onVideoThumbnailChange = () => {
    setUploadFor(TipsAttachmentGeneralTypes.Embeddable);
    setAttachmentUploadPanel(true);
  };

  const onThumbnailRemoveHandler = () => {
    setPreview(null);
    props.onChange({
      file: null,
      preview: null,
    });
  };

  const openTitleAttachmentUploader = () => {
    setAttachmentUploadPanel(true);
  };

  return (
    <div className={styles.TipsAttachmentUploader}>
      {preview && (
        <TipsMediaThumbnail
          onThumbnailRemove={onThumbnailRemoveHandler}
          onVideoThumbnailChange={onVideoThumbnailChange}
          attachment={preview}
        />
      )}
      {attachmentUploadPanel && (
        <TipsUploadablePanel
          onChange={onFileUploadedHandler}
          onClose={closePanel}
        />
      )}

      <div className={styles.TogglerContents}>
        <Button
          className={styles.AddCoverToggler}
          onClick={openTitleAttachmentUploader}
        >
          <FontAwesomeIcon icon={faCamera} />
          Cover Photo
        </Button>
        <div
          className={
            clsx(styles.LinkTooggler, embeddablePanel && styles.LinkToogglerActive)
          }
          ref={attachmentWindowRef}
        >
          <Button
            className={styles.AddLinkToggler}
            onClick={() => setEmbeddablePanel(!embeddablePanel)}
          >
            <FontAwesomeIcon icon={faPaperclip} />
            Attachment
          </Button>
          {embeddablePanel && (
            <div>
              <TipsEmbeddablePanel
                onChange={onEmbeddableAttachmentChange}
                onCancel={closePanel}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TipsAttachmentUploader;
