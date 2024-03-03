export interface TipsCountDataType {
  thumbsUp: number;
  thumbsDown: number;
  shares: number;
  enrollments: number;
  comments: number;
}

export interface TipsAuthorCountsDataType {
  tips: number;
  thumbsUp: number;
  followers: number;
  followings: number;
  views: number;
  enrolledTips: number;
  savedTips: number;
}
export interface TipsAuthorDataType {
  name: string;
  username: string;
  avatar: string;
  quote: string;
  address: string;
  profession?: string;
  isFollowing: boolean;
  counts: TipsAuthorCountsDataType;
}

export interface EnrollmentServerData {
  id: string;
  start_at: string;
  end_at: string;
  enrolled_by: {
    id: number;
    name: string;
    username: string;
    avatar: string;
    quote: string;
    profession: string;
    address: string;
    is_verified: boolean;
    is_following: boolean;
    counts: {
      tips: number;
      thumbs_up: number;
      followers: number;
      followings: number;
      views: number;
      enrolled_tips: any;
      saved_tips: number;
    };
  };
  total: number;
  completed: number;
  done: number;
  skipped: number;
  failed: number;
  re_enrollable: number;
  tasks: any;
  tips: {
    id: string;
    title: string;
    slug: string;
    thumbnail: string;
    category: string;
    privacy: string;
    saved: boolean;
    enrolled: boolean;
    reacted: boolean;
    editable: boolean;
    deletable: boolean;
    last_enrollment: any;
    sharable_url: string;
    author: {
      id: number;
      name: string;
      username: string;
      avatar: string;
      quote: string;
      profession: string;
      address: string;
      is_verified: boolean;
      is_following: boolean;
      counts: {
        tips: number;
        thumbs_up: number;
        followers: number;
        followings: number;
        views: number;
        enrolled_tips: number;
        saved_tips: number;
      };
    };
    published_at: string;
    created_at: string;
    modified_at: string;
    mute: number;
    lang: string;
    counts: {
      thumbs_up: number;
      thumbs_down: number;
      shares: number;
      enrollments: number;
      comments: number;
      save: number;
    };
  };
}
