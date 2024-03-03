import { TipsAuthorBaseInterface } from '../../interfaces/tips.interface';
export interface TipsMetaProps {
  author: TipsAuthorBaseInterface;
  category: string;
  publishedAt?: string;
  categoryUrl: string;
  updatedAt?: string;
  privacyActive?: boolean;
  tipsPrivacy?: string;
  tipsDetailsAuthor?: boolean;
}
