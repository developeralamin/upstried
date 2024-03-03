import {
  TipsAttachmentInterface,
  TipsThumbnailObjInterface,
} from '../../../interfaces/tips.interface';

export interface TipsAttachmentProps {
  attachment?: TipsAttachmentInterface | null;
  thumbnailObj?: TipsThumbnailObjInterface;
}
