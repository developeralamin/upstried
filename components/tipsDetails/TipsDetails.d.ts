import { withTipsInterface } from './../../interfaces/tips.interface';

export interface TipsDetailsProps extends withTipsInterface {
  commentsWindowCloser: JSX.Element;
  tipsDetailsActions: JSX.Element;
}
