/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input, message, Modal, Tooltip } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { CommentDataType } from '../../api/comments/dataTypes';
import CommentsAPI from '../../api/comments/request';
import { HTTP_SUCCESS_STATUS } from '../../config/api';
import { strlen } from '../../services/util';
import styles from './TipsComment.module.scss';
const { confirm } = Modal;
export interface TipsCommentProps {
  comment: CommentDataType;
  tipsSlug: string;
  onCommentDeleted: any;
  onUpdated?: any;
}

const TipsComment: React.FC<TipsCommentProps> = (props) => {
  const [commentContent, setCommentContent] = useState({ ...props.comment });
  const [isEditOn, setIsEditOn] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  useEffect(() => {
    setCommentContent({ ...props.comment });
  }, [props.comment]);
  useEffect(() => {
    window.addEventListener('keydown', onPressEscHandler);
    return () => {
      window.removeEventListener('keydown', onPressEscHandler);
    };
  }, []);
  const doThumbsUp = async () => {
    if (!commentContent?.isReacted) {
      setLikeLoading(true);
    }

    setCommentContent((prevState: any) => ({
      ...prevState,
      isReacted: !prevState.isReacted,
      totalLikes: !prevState.isReacted
        ? prevState.totalLikes + 1
        : prevState.totalLikes - 1,
    }));

    if (commentContent?.isReacted) {
      setTimeout(() => {
        setLikeLoading(false);
      }, 500);
    }

    const commentReactionResponse = await CommentsAPI.thumbsup({
      reactionable_id: props.comment.uuid,
    });
    if (commentReactionResponse.status !== HTTP_SUCCESS_STATUS) {
      // @todo
      setCommentContent((prevState: any) => {
        const thumbsUp = commentContent.isReacted
          ? commentContent.totalLikes > 0
            ? commentContent.totalLikes - 1
            : 0
          : commentContent.totalLikes + 1;
        return {
          ...commentContent,
          isReacted: !commentContent.isReacted,
          totalLikes: thumbsUp,
        };
      });
    }
  };

  const deleteComment = async () => {
    confirm({
      title: 'Are you sure to delete this comment?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        props.onCommentDeleted({ ...commentContent });
        CommentsAPI.delete({
          comment: props.comment,
        }).then((response) => {
          if (response.status === HTTP_SUCCESS_STATUS) {
            message.success('Comment deleted successfully');
          } else {
            message.error('Sorry comment did not deleted');
          }
        });
      },
    });
  };

  const updateComment = async (ev: any) => {
    setCommentContent({
      ...commentContent,
      comment: ev.target.value,
    });
    const commentsResponse = await CommentsAPI.update({
      comment: ev.target.value,
      commentId: props.comment.uuid,
    });
    if (commentsResponse.status === 200 && commentsResponse.data) {
      message.success(commentsResponse.message);
      setIsEditOn(false);
    } else {
      setCommentContent({
        ...commentContent,
      });
      setIsEditOn(false);
      message.error('Opps! something went wrong');
    }
  };

  const onPressEscHandler = (ev: any) => {
    if (ev.keyCode === 27) {
      setIsEditOn(false);
    }
  };

  const contentBody = (
    <>
      <div className={styles.NameAction}>
        <div className={styles.NameDate}>
          <h5 className={styles.Name} onClick={() => router.push(commentContent.authorUrl)}>
            {strlen(commentContent.authorName, 13, '.')}
          </h5>
          <span className={styles.Date}>{commentContent.createdAt}</span>
        </div>
      </div>
      <p className={styles.Feedback}>{commentContent.comment}</p>
      <div className={styles.Actions}>
        <div className={styles.ActionItem}>
          <Tooltip title="Like">
            <button
              onClick={doThumbsUp}
              className={
                (likeLoading ? styles.LikeLoading : '') +
                ' ' +
                (commentContent.isReacted ? styles.ThumbsUpActive : '')
              }
            >
              <span className="icon1">
                <FontAwesomeIcon icon={faHeart} />
              </span>
            </button>
          </Tooltip>
          <span>{commentContent.totalLikes}</span>
        </div>
        <div className={styles.ActionItem + ' ' + styles.ReplyToggler}>
          {commentContent.editable ? (
            <button
              onClick={() => setIsEditOn(true)}
              className={styles.BtnEdit}
            >
              Edit
            </button>
          ) : null}
          {commentContent.destroyable ? (
            <button onClick={deleteComment} className={styles.BtnDel}>
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
  const commentForm = (
    <div className={styles.EditComment}>
      <Input
        onPressEnter={updateComment}
        defaultValue={commentContent.comment}
        autoComplete="off"
      />
      <p>Enter to post or Press ESC to Cancel</p>
    </div>
  );
  const Comment = (
    <div className={styles.TipsComment}>
      <div className={styles.TipsCommentWrapper}>
        <div className={styles.Left}>
          {commentContent.authorAvatar ? (
            <div>
              <Avatar src={commentContent.authorAvatar} className={'image'} />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={styles.Right}>
          {isEditOn ? commentForm : contentBody}
        </div>
      </div>
    </div>
  );
  return Comment;
};

export default TipsComment;
