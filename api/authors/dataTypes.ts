export interface WorkplaceObj {
  position: string;
  workplace: string;
  isPresent: boolean;
  start: string;
  end: string;
}

export interface EducationObj {
  degree: string;
  institution: string;
  isPresent: boolean;
  start: string;
  end: string;
}

export interface AuthorObj {
  id: number;
  name: string;
  username: string;
  authorUrl: string;
  email: string;
  mobile: string;
  avatar: string;
  gender: string;
  profession: string;
  dob: string;
  city: string;
  address: string;
  country: string;
  connected: string[];
  isVerified: boolean;
  quote: string;
  isFollowing: boolean;
  interests: string[];
  about: string;
  sharableUrl: string;
  education: EducationObj[];
  workplaces: WorkplaceObj[];
  isSurveyRequired: boolean;
  ownTips: number;
  thumbsUp: number;
  followers: number;
  following: number;
  views: number;
  enrolledTips: number;
  savedTips: number;
  facebook: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  personal: string;
  cover: string;
  language: string;
  expire_date: string;
}

export interface ServerWorkplaceObj {
  position: string | null;
  workplace: string | null;
  is_present: 0 | 1;
  start: string;
  end: string | null;
}

export interface ServerEducationObj {
  degree: string | null;
  institution: string | null;
  is_present: 0 | 1;
  start: string | null;
  end: string | null;
}

export interface ServerAuthorObj {
  id: number | null;
  name: string | null;
  username: string | null;
  email: string;
  mobile: string | null;
  avatar: string | null;
  gender: string | null;
  profession: string | null;
  date_of_birth: string | null;
  city: string | null;
  address: string | null;
  country: string | null;
  connected_with: string[];
  sharable_url: string;
  is_verified: 0 | 1;
  is_following: 0 | 1;
  interests: string[];
  quote: string | null;
  about: string;
  educations: ServerEducationObj[];
  workplaces: ServerWorkplaceObj[];
  social_info: {
    facebook: string | null;
    linkedin: string | null;
    twitter: string | null;
    youtube: string | null;
    personal: string | null;
  };
  survey_needed: 0 | 1;
  counts: {
    tips: number;
    thumbs_up: number;
    followers: number;
    followings: number;
    views: number;
    enrolled_tips: number;
    saved_tips: number;
  };
  cover_photo: string;
  preferred_lang: string;
  expire_date: string | null;
}
