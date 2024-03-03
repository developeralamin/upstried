import { DEFAULT_PROFILE_PHOTO } from './../../config/link';
import { getRelativeTime } from '../../services/util';
import { CommentDataType } from './dataTypes';

export const mapCommentServerToClient = (comment: any) => {
  return {
    uuid: comment.uuid,
    comment: comment.comment,
    totalLikes: comment.counts.thumbs_up,
    createdAt: getRelativeTime(comment.created_at),
    isReacted: comment.is_reacted,
    editable: comment.editable,
    destroyable: comment.destroyable,
    authorUrl: `/authors/${comment.author.username}`,
    authorName: comment.author.name,
    authorAvatar: comment.author.avatar || DEFAULT_PROFILE_PHOTO,
  } as CommentDataType;
};
export const mapCommentsServerToClient = (comments: Array<any>) => {
  return comments.map((comment: any) => {
    return mapCommentServerToClient(comment);
  });
};


export const mapCommentMetaServerToClient = (meta: any) => ({
  total: meta.total,
  page: meta.current_page + 1,
})