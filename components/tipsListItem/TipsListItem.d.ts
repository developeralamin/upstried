import { TipsBaseInterface } from './../../interfaces/tips.interface';
export interface TipsListItemProps {
  tips: TipsBaseInterface;
  onTipDeleted?: any;
  onTipUpdated?: any;
  hideTitle?: boolean;
  hideAuthorInfo?: boolean;
  disableLink?: boolean;
  previewOnly?: boolean;
  singleView?: boolean;
  hideMeta?: boolean;
  privacyActive?: boolean;
}
