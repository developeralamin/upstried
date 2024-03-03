import { TipsEnrollmentStatus } from './../../enums/Tips.enum';
export interface TipsDetailsActionsProps {
  onTipActionToggle: any;
  commentModalStatus: boolean;
  totalComment: number;
  classes?: string;
  tipsSlug: string;
  tipsSharableUrl: string;
  tipsMute: number;
  tipsEnrolled: boolean;
  tipsEnrollmentStatus: TipsEnrollmentStatus;
  tipsSaved: boolean;
  editable: boolean;
  deletable: boolean;
  isOwnTips: boolean;
  onChange: any;
  tipsEditForm: any;
  tipsEditFormToggler: any;
  tipsTitle: string;
}

export interface onDiscardInterface {
  title: string;
  type: string;
  successMessage: string;
  failedMessage: string;
}
