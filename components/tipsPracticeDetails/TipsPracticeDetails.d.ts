import { TipsDetailsProps } from './../tipsDetails/TipsDetails.d';

export interface TipsPracticeDetailsProps extends TipsDetailsProps {
  tasks?: any;
  setTasks?: any;
  loading?: boolean;
  setLoading?: any;
  progressStatus?: any;
  setProgressStatus?: any;
}
