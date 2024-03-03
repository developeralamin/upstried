import {
  TipsAttachmentContentTypes,
  TipsAttachmentVendorTypes,
  TipsEnrollmentStatus,
} from '../enums/Tips.enum';
import TaskInterface from './task.interface';

export interface TipsCountInterface {
  thumbsUp: number;
  thumbsDown: number;
  shares: number;
  enrollments: number;
  comments: number;
}

export interface TipsAuthorCountsInterface {
  tips: number;
  thumbsUp: number;
  followers: number;
  followings: number;
  views: number;
  enrolledTips: number;
  savedTips: number;
}
export interface TipsAuthorBaseInterface {
  name: string;
  username: string;
  avatar: string;
  quote: string;
  address: string;
  profession?: string;
  isFollowing: boolean;
  counts: {
    tips: number;
    thumbsUp: number;
    followers: number;
  };
}
export interface TipsAuthorInterface extends TipsAuthorBaseInterface {
  address: string;
  counts: TipsAuthorCountsInterface;
}

interface LastEnrollmentInterface {
  id: string;
  totalTask: number;
  completedTask: number;
  failedTask: number;
  skippedTask: number;
  reEnrollable: boolean;
  startAt: string;
  endAt: string;
}
export interface TipsAttachmentInterface {
  resourceUrl?: string;
  type: TipsAttachmentContentTypes;
  url: string;
  vendor?: TipsAttachmentVendorTypes;
}
export interface TipsthumbnailObjInterface {
  url: string;
  alt: string;
}

export interface TipsFetchQueryInterface {
  tags?: Array<string> | undefined;
  author?: string;
  q?: string | undefined | null;
  preference?: string;
  page?: number;
  category?: string;
}

export interface TipsBaseInterface {
  id: string;
  title: string;
  slug: string;
  detailsUrl: string;
  singleTipsUrl: string;
  practiceUrl: string;
  attachment?: TipsAttachmentInterface | null;
  thumbnailObj: TipsthumbnailObjInterface;
  category: string;
  categoryUrl: string;
  enrollmentStatus: TipsEnrollmentStatus;
  privacy: string;
  enrolled: boolean;
  reacted: boolean;
  totalLikes: number;
  totalEnrollments: number;
  author: TipsAuthorBaseInterface;
  lastEnrollment: LastEnrollmentInterface | null;
  sharableUrl: string;
  publishedAt?: string;
  updatedAt?: string;
  short_description?: string;
  reading_time?: number;
  audio_url?: string;
  reasons_to_read?: string;
}

export interface TipsInterface extends TipsBaseInterface {
  thumbnail: string;
  description: any;
  tags: any;
  saved: boolean;
  isOwnTips: boolean;
  editable: boolean;
  deletable: boolean;
  counts: TipsCountInterface;
  author: TipsAuthorInterface;
  createdAt: string;
  tasks: Array<TaskInterface>;
  mute: number;
  reasons_to_read: string;
  summary: string;
  stories: string;
  learnings: string;
  short_description: string;
  reading_time: number;
  audio_url: string;
}

export interface TipsResponseInterface {
  data: TipsInterface;
  status: number;
}

export interface withTipsInterface {
  tips: TipsInterface;
}
export interface FetchTipsResponseInterface {
  data: TipsBaseInterface[];
  meta: TipsMetaInterface;
  status: number;
}

export interface TipsMetaInterface {
  total: number;
  page: number;
  nextPage: number;
  currentPage: number;
  lastPage: number;
}

export interface UploadedAttachmentInterface {
  file: File | null;
  preview: TipsAttachmentInterface | null;
}
