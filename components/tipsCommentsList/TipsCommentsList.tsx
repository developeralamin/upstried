import { Button, List, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import AccountAPI from '../../api/accounts/request';
import { CommentDataType } from '../../api/comments/dataTypes';
import CommentsAPI from '../../api/comments/request';
import { HTTP_SUCCESS_STATUS } from '../../config/api';
import { isAuthenticated } from '../../services/authentication';
import TipsComment from '../tipsComment/TipsComment';
import TipsCommentForm from '../tipsCommentForm/TipsCommentForm';
import styles from './TipsCommentsList.module.scss';

export interface TipsCommentsListProps {
  comments: any;
  totalComments: number;
  onToggleWindow: any;
  tipsSlug: string;
  onCommentCreated: any;
  onCommentDeleted: any;
}

const TipsCommentsList: React.SFC<TipsCommentsListProps> = (props) => {
  const [comments, setComments] = useState([...props.comments]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [deletedComments, setDeletedComments] = useState<any[]>([]);
  const [page, setPage] = useState(2);
  useEffect(() => {
    setComments([...props.comments]);
  }, [props.comments]);
  const loadMore = () => {
    setLoading(true);
    if (comments.length - 1 >= props.totalComments) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    fetchComments();
  };
  const onCommentDeletedHandler = (deletedComment: CommentDataType) => {
    setDeletedComments([...deletedComments, deletedComment.uuid]);
    if (deletedComment && props.onCommentDeleted) {
      props.onCommentDeleted(deletedComment);
    }
  };
  const fetchComments = async () => {
    const commentsResponse = await CommentsAPI.getByTipId({
      slug: props.tipsSlug,
      page,
    });
    if (
      commentsResponse.status === HTTP_SUCCESS_STATUS &&
      commentsResponse.data
    ) {
      setComments([...comments, ...commentsResponse.data]);
      setPage(commentsResponse.page);
      setLoading(false);
    }
  };
  const onCommentCreated = (comment: CommentDataType) => {
    setComments([comment, ...comments]);
    if (props.onCommentCreated) {
      props.onCommentCreated(comment);
    }
  };

  return (
    <div className={styles.TipsCommentsList}>
      <h2 className={styles.CommentsCount}>{props.totalComments} Comments</h2>
      <p className={styles.CommentsTagline}>Looking forward to your feedback</p>
      {isAuthenticated() ? (
        <TipsCommentForm
          onCommentCreated={onCommentCreated}
          tipsSlug={props.tipsSlug}
        />
      ) : (
        <div className={styles.Signin}>
          <img src="/comment-signuout.svg" alt="preview" />
          <h4 className={styles.Tagline}>Join the discussion</h4>
          <Button
            type="primary"
            className={styles.SigninCommnetBtn + ' theme-btn theme-btn-md'}
            onClick={() => AccountAPI.logoutForcely()}
          >
            Sign in
          </Button>
        </div>
      )}
      {comments.length > 0 ? (
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={loadMore}
          hasMore={!loading && hasMore}
          useWindow={false}
        >
          <List
            dataSource={comments}
            renderItem={(item) => {
              return !deletedComments.includes(item.uuid) ? (
                <List.Item key={item.uuid}>
                  <TipsComment
                    onCommentDeleted={onCommentDeletedHandler}
                    tipsSlug={props.tipsSlug}
                    comment={item}
                    key={item.uuid}
                  />
                </List.Item>
              ) : (
                ''
              );
            }}
          >
            {loading && hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      ) : null}
    </div>
  );
};

export default TipsCommentsList;
