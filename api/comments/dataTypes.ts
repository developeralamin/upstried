

export interface CommentDataType {
  uuid: string;
  comment: string;
  totalLikes: number;
  createdAt: string;
  isReacted: boolean;
  editable: boolean;
  destroyable: boolean;
  authorUrl: string;
  authorName: string;
  authorAvatar: string;
}
