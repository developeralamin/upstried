import { Empty } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import ServerAuthorsAPI from '../../api/authors/request';
import { pluralize } from '../../services/util';
import AuthorSearch from '../authorSearch/AuthorSearch';
import AuthorsListItem from '../authorsListItem/AuthorsListItem';
import EmptyAuthors from '../emptyAuthors/EmptyAuthors';
import styles from './AuthorsFollowingList.module.scss';
export interface AuthorsListProps {
  authors?: any[];
  page?: number;
  total?: number;
  apiEndpoint?: string;
  apiEndpointParams?: any;
  getTipsActionCreator: any;
  filterBy?: any;
  router: any;
  useWindow?: boolean;
  type?: string;
  username?: string;
  onTotal?: any;
  q?: string;
}

export interface AuthorsListState {
  data: Array<any>;
  loading: boolean;
  hasMore: boolean;
  page: number;
  total: number;
  deletedIds: any;
  filterBy?: any;
  current_page: any;
}

class AuthorsList extends React.Component<AuthorsListProps, AuthorsListState> {
  state = {
    data: [],
    loading: false,
    page: 1,
    total: 0,
    hasMore: true,
    deletedIds: [],
    filterBy: '',
    current_page: 1,
  } as any;

  componentDidMount() {
    if (
      this.props.authors &&
      this.props.authors.length > 0 &&
      this.props.page &&
      this.props.total
    ) {
      this.setState({
        data: this.props.authors,
        total: this.props.total,
        page: this.props.page + 1,
        current_page: this.props.page,
      });
      if (this.props.total <= this.props.authors.length) {
        this.setState({ hasMore: false });
      }
    }
  }

  filterByTags() {
    const request: any = {};
    this.setState({
      loading: true,
    });
    request['category'] = this.props.router.query.category;
    request['tags'] = this.props.router.query.tags;
    request['author'] = this.props.router.query.author;
    request['q'] = this.props.q || this.props.router.query.q;
    request['preference'] = this.props.router.query.preference;
    request['page'] = 1;
    if (this.props.apiEndpoint) {
      request['apiEndpoint'] = this.props.apiEndpoint;
    }
    if (this.props.apiEndpointParams) {
      request['apiEndpointParams'] = this.props.apiEndpointParams;
    }

    ServerAuthorsAPI.all(request).then((response) => {
      if (response && response.status === 200) {
        this.setState({
          data: [...response.data],
          total: response.total,
          loading: false,
          page: response.next_page,
          hasMore:
            this.state.data.length + response.data.length >= response.total
              ? false
              : true,
        });
      }
      this.setState({
        loading: false,
      });
    });
  }

  componentDidUpdate(prevProps: any) {
    if (
      JSON.stringify(this.props.router.query) !==
      JSON.stringify(prevProps.router.query)
    ) {
      this.setState({
        page: 1,
        data: [],
        total: 0,
        current_page: 1,
      });
      if (this.props.router.pathname !== '/authors/[username]')
        this.filterByTags();
    }
  }

  onTipDeletedHandler = (deletedTip: any) => {
    this.setState({
      deletedIds: [...this.state.deletedIds, deletedTip.uuid],
    });
  };

  handleInfiniteOnLoad = () => {
    this.setState({
      loading: true,
    });

    if (!this.state.hasMore) {
      this.setState({
        loading: false,
      });
      return;
    }

    const request: any = {};
    request['category'] = this.props.router.query.category;
    request['tags'] = this.props.router.query.tags;
    request['author'] = this.props.router.query.author;
    request['preference'] = this.props.router.query.preference;
    request['page'] = this.state.page;
    request['q'] = this.props.q || this.props.router.query.q;

    if (this.props.apiEndpoint) {
      request['apiEndpoint'] = this.props.apiEndpoint;
    }
    if (this.props.apiEndpointParams) {
      request['apiEndpointParams'] = this.props.apiEndpointParams;
    }
    if (this.props.username) {
      request['username'] = this.props.username;
    }
    switch (this.props.type) {
      case 'authorFollowing':
        this.getFollowings(request);
        break;
      case 'authorFollowers':
        this.getFollowers(request);
        break;

      default:
        this.getAll(request);
        break;
    }
  };

  getAll = (request: any) => {
    ServerAuthorsAPI.all(request).then((response) => {
      if (response?.status === 200) {
        const newTips = response.data;

        if (this.state.total === 0) {
          this.setState({
            total: response.total,
          });
          if (this.props.onTotal) {
            this.props.onTotal(response.total);
          }
        }
        if (this.state.current_page === response.last_page) {
          this.setState({
            hasMore: false,
            loading: false,
          });
        }
        this.setState({
          data: [...this.state.data, ...newTips],
          loading: false,
          page: response.next_page,
          current_page: response.current_page,
        });
      }
    });
  };

  getFollowings = (request: any) => {
    ServerAuthorsAPI.getAuthorFollowings(request).then((response) => {
      if (response?.status === 200) {
        const newTips = response.data;

        if (this.state.total === 0) {
          this.setState({
            total: response.total,
          });
          if (this.props.onTotal) {
            this.props.onTotal(response.total);
          }
        }
        if (this.state.current_page === response.last_page) {
          this.setState({
            hasMore: false,
            loading: false,
          });
        }
        this.setState({
          data: [...this.state.data, ...newTips],
          loading: false,
          page: response.next_page,
          current_page: response.current_page,
        });
      }
    });
  };

  getFollowers = (request: any) => {
    ServerAuthorsAPI.getAuthorFollowers(request).then((response) => {
      if (response?.status === 200) {
        const newTips = response.data;

        if (this.state.total === 0) {
          this.setState({
            total: response.total,
          });
          if (this.props.onTotal) {
            this.props.onTotal(response.total);
          }
        }
        if (this.state.current_page === response.last_page) {
          this.setState({
            hasMore: false,
            loading: false,
          });
        }
        this.setState({
          data: [...this.state.data, ...newTips],
          loading: false,
          page: response.next_page,
          current_page: response.current_page,
        });
      }
    });
  };
  onSearchHandler = (response: any) => {
    this.setState({
      data: response.data,
      total: response.total,
      loading: false,
      page: response.next_page,
    });
  };
  render() {
    return (
      <>
        <div className={styles.AuthorsListContainer}>
          <div className={styles.Header}>
            <h3>
              {pluralize('Following', this.state.total)} ({this.state.total})
            </h3>
            <AuthorSearch
              authorType="authorFollowing"
              username={this.props.username || ''}
              onSearch={this.onSearchHandler}
              loading={(loading) => this.setState({ loading })}
            />
          </div>
          {this.state.loading ? (
            <EmptyAuthors />
          ) : (
            <InfiniteScroll
              initialLoad={
                this.props.authors && this.props.authors.length > 0
                  ? false
                  : true
              }
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!this.state.loading && this.state.hasMore}
              useWindow={this.props.useWindow ?? true}
            >
              {this.state.data && this.state.data.length > 0 ? (
                <div className={styles.AuthorsList}>
                  {this.state.data.map((item: any) => {
                    if (!this.state.deletedIds.includes(item.id)) {
                      return <AuthorsListItem key={item.id} author={item} />;
                    }
                  })}
                </div>
              ) : null}

              <div className={styles.Bottom}>
                {!this.state.loading && this.state.data.length < 1 ? (
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 60,
                    }}
                  ></Empty>
                ) : null}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </>
    );
  }
}

const TipsWithRouter = (props: any) => {
  const router = useRouter();
  return <AuthorsList {...props} router={router} />;
};

export default TipsWithRouter;
