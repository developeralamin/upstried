import { withTipsInterface } from './../../interfaces/tips.interface';

export interface TipsContentLayoutProps extends withTipsInterface {
  tasks?: any;
  setTasks?: any;
  loading?: boolean;
  setLoading?: any;
  progressStatus?: any;
  setProgressStatus?: any;
  comments: any[];
  totalComments: number;
  isPractice: boolean;
  onCommentCreated?: any;
  onCommentDeleted?: any;
}
