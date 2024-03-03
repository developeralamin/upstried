import React from 'react';
import { LinkAttachInterfaceWithIndex } from '../../interfaces/attachment.interface';
import attachmentHandler from '../../services/attachmentHandler';
import styles from './AttachmentToolbar.module.scss';
import AudioToolbar from './AudioToolbar';
import DocsToolbar from './DocsToolbar';
import ImageToolbar from './ImageToolbar';
import LinkToolbar from './LinkToolbar';
import PdfToolbar from './PdfToolbar';
import VideoToolbar from './VideoToolbar';

export interface AttachmentToolbarProps {
  attachments: Array<LinkAttachInterfaceWithIndex>;
  isEditMode?: boolean;
  onRemove?: (attachment: LinkAttachInterfaceWithIndex) => void;
}

const AttachmentToolbar: React.FC<AttachmentToolbarProps> = (props) => {
  const {onRemove, attachments, isEditMode} = props;
  const totalImage = attachmentHandler.getTotalImageNumber(props.attachments);

  const totalDocs = attachmentHandler.getTotalDocsNumber(props.attachments);

  const totalPdf = attachmentHandler.getTotalPdfNumber(props.attachments);

  const totalAudio = attachmentHandler.getTotalAudioNumber(props.attachments);

  const totalVideo = attachmentHandler.getTotalVideoNumber(props.attachments);

  const totalLink = attachmentHandler.getTotalLinkNumber(props.attachments);
  return (
    <div className={styles.AttachmentToolbar}>
      {totalImage > 0 && (
        <ImageToolbar
          onRemove={onRemove}
          isEditMode={isEditMode || false}
          attachments={attachmentHandler.getImagesFromUploadedFiles(attachments)}
          attachmentsCount={totalImage}
        />
      )}
      {totalDocs > 0 && (
        <DocsToolbar
          onRemove={onRemove}
          isEditMode={isEditMode || false}
          attachments={attachmentHandler.getDocsFromUploadedFiles(attachments)}
          attachmentsCount={totalDocs}
        />
      )}
      {totalPdf > 0 && (
        <PdfToolbar
          onRemove={onRemove}
          isEditMode={isEditMode || false}
          attachments={attachmentHandler.getPdfsFromUploadedFiles(attachments)}
          attachmentsCount={totalPdf}
        />
      )}
      {totalAudio > 0 && (
        <AudioToolbar
          onRemove={onRemove}
          isEditMode={isEditMode || false}
          attachments={attachmentHandler.getAudiosFromUploadedFiles(attachments)}
          attachmentsCount={totalAudio}
        />
      )}
       {totalVideo > 0 && (
        <VideoToolbar
          onRemove={onRemove}
          isEditMode={isEditMode || false}
          attachments={attachmentHandler.getVideosFromUploadedFiles(attachments)}
          attachmentsCount={totalVideo}
        />
      )}
     {totalLink > 0 && (
        <LinkToolbar
          onRemove={onRemove}
          isEditMode={isEditMode || false}
          attachments={attachmentHandler.getLinksFromUploadedFiles(attachments)}
          attachmentsCount={totalLink}
        />
      )}
    </div>
  );
};

export default AttachmentToolbar;
