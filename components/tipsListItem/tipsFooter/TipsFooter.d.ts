import { TipsEnrollmentStatus } from '../../../enums/Tips.enum';

export interface TipsFooterProps {
  tipsReaction: boolean;
  tipsEnrolled: boolean;
  tipsTotalReactions: number;
  tipsTotalEnrollments: number;
  tipsEnrollmentStatus: TipsEnrollmentStatus;
  tipsLastEnrollment: any;
  title: string;
  detailsLink: string;
  tipsKeySlug: string;
  tipsKeyId: string;
  pacticeUrl: string;
  imageAttachmentUrl?: string;
  tipsAuthor?: string;
  tipsCategory?: string;
}
