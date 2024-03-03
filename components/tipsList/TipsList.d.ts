import {
  TipsBaseInterface,
  TipsInterface,
  TipsMetaInterface,
} from './../../interfaces/tips.interface';

export interface TipsListProps {
  resResolver?: any;
  tips?: TipsBaseInterface[];
  meta: TipsMetaInterface;
  page?: number;
  total?: number;
  endpoint?: string;
  params?: any;
  apiEndpoint?: string;
  apiEndpointParams?: any;
  getTipsActionCreator: any;
  filterBy?: any;
  useWindow: boolean;
  router: any;
  singleView?: boolean;
  initialLoad?: boolean;
  searchbar?: boolean;
  querySearch?: boolean;
  privacyActive?: boolean;
}

export interface TipsListState {
  data: TipsBaseInterface[];
  loading: boolean;
  hasMore: boolean;
  page: number;
  total: number;
  currentPage: any;
  query?: string | null;
  requestFailures?: any;
}

export interface FetchTipsRequestInterface {
  page: number;
  currentPage?: number;
  params?: any;
}
