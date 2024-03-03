import { Empty } from 'antd';
import clsx from 'clsx';
import router, { useRouter } from 'next/router';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import TipsAPI from '../../api/books/request';
import {
  FetchTipsResponseInterface,
  TipsBaseInterface,
  TipsFetchQueryInterface,
  TipsMetaInterface,
} from '../../interfaces/tips.interface';
import EmptyTips from '../emptyTips/EmptyTips';
import TipsListItem from '../tipsListItem/TipsListItem';
import TipsSearch from '../tipsSearch/TipsSearch';
import {
  FetchTipsRequestInterface,
  TipsListProps,
  TipsListState,
} from './TipsList.d';
import styles from './TipsList.module.scss';

class TipsList extends React.Component<TipsListProps, TipsListState> {
  state = {
    data: [],
    loading: false,
    page: 1,
    total: 0,
    hasMore: true,
    currentPage: 1,
    query: null,
    requestFailures: [],
  };

  componentDidMount() {
    const { tips, meta } = this.props;
    if (meta?.total === 0) this.setState({ hasMore: false });
    if (tips && meta) {
      this.setInitialTips(tips, meta);
      if (meta.total <= tips.length) {
        this.setState({ hasMore: false });
      }
    }
  }

  componentDidUpdate(prevProps: TipsListProps) {
    if (this.state.requestFailures.length > 5) return;
    if (!this.props.router) return;
    if (
      JSON.stringify(this.props.router.query) !==
      JSON.stringify(prevProps.router.query)
    ) {
      if (
        prevProps.router.query.preference !== this.props.router.query.preference
      ) {
        this.fetchTipsWithQuery();
      } else {
        if (this.props.tips && this.props.tips?.length > 0) {
          this.setInitialTips(this.props.tips, this.props.meta);
        } else {
          this.fetchTipsWithQuery();
        }
      }
    }
  }

  startLoading = () => this.setState({ loading: true });

  stopLoading = () => this.setState({ loading: false });

  setInitialTips = (tips: TipsBaseInterface[], meta: TipsMetaInterface) => {
    this.setState({
      data: tips,
      total: meta?.total || 0,
      page: meta?.page + 1 || 1,
      currentPage: meta?.page || 1,
    });
  };

  fetchTipsWithQuery() {
    this.setState(
      {
        data: [],
        page: 1,
        currentPage: 1,
        hasMore: true,
        loading: true,
      },
      () => {
        this.fetchTips({ page: 1, currentPage: 1 });
      }
    );
  }

  fetchTips = async ({ page, currentPage }: FetchTipsRequestInterface) => {
    if (this.state.requestFailures.length > 5) return;
    this.startLoading();
    const { author, tags, q, preference, category }: TipsFetchQueryInterface =
      router.query;
    const { endpoint, params } = this.props;
    const { hasMore, query } = this.state;
    if (!hasMore) {
      this.stopLoading();
      return;
    }
    try {
      const response = await TipsAPI.fetchTips(
        {
          tags,
          author,
          q: query ? query : q,
          preference,
          page,
          endpoint: endpoint || '',
          params: params || null,
          category,
        },
        this.props.resResolver
      );
      this.afterFetchedData(response);
      this.stopLoading();
      this.setState({ requestFailures: [] });
    } catch (error) {
      this.stopLoading();
      this.afterFetchingFailedData({ currentPage });
    }
  };

  afterFetchedData = (response: FetchTipsResponseInterface) => {
    const { data, meta } = response;
    const { data: prevData } = this.state;
    const hasMore = meta.total > prevData.length + data.length;
    if (!hasMore) {
      this.setState({ hasMore: false, loading: false });
    }
    this.setState({
      data: [...prevData, ...data],
      total: meta?.total,
      page: meta?.currentPage + 1,
      currentPage: meta?.currentPage,
    });
  };

  afterFetchingFailedData = (args: any) => {
    this.setState({
      requestFailures: [...this.state.requestFailures, 'error'],
    });
    this.setState({
      data: [...this.state.data],
      page: this.state.page + 1,
      currentPage: args.currentPage,
    });
  };

  onSearchHandler = (response: any) => {
    this.setState({
      data: response.data,
      total: response.meta.total,
      page: response.meta.currentPage + 1,
      currentPage: response.meta.currentPage,
      hasMore: response.meta.total > response.data.length,
      query: response.query,
    });
  };

  render() {
    const { initialLoad, useWindow, endpoint, searchbar, privacyActive } =
      this.props;
    const { page, loading, hasMore, data } = this.state;
    return (
      <>
        {searchbar && (
          <div className={clsx(styles.TipsSearchbar, 'TipsSearchbar')}>
            <h3>Books</h3>
            <TipsSearch
              endpoint={endpoint}
              onSearch={this.onSearchHandler}
              onSearchLoading={(searchLoading: boolean) =>
                this.setState({ loading: searchLoading })
              }
            />
          </div>
        )}
        <div className={styles.TipsList}>
          <InfiniteScroll
            initialLoad={initialLoad || false}
            pageStart={0}
            loadMore={() => this.fetchTips({ page })}
            hasMore={!loading && hasMore}
            useWindow={useWindow || true}
          >
            {data && data.length > 0 ? (
              <div className={styles.TipsList}>
                {data.map((item: TipsBaseInterface, itemIndex: number) => {
                  return (
                    <TipsListItem
                      key={itemIndex}
                      singleView={this.props.singleView || false}
                      tips={item}
                      privacyActive={privacyActive}
                    />
                  );
                })}
              </div>
            ) : null}
            <div className={styles.Bottom}>
              {!loading && data.length < 1 ? (
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{
                    height: 60,
                  }}
                ></Empty>
              ) : null}
              {loading ? <EmptyTips /> : null}
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

const TipsWithRouter = (props: any) => {
  const router = useRouter();
  return <TipsList {...props} router={router} />;
};

export default TipsWithRouter;
