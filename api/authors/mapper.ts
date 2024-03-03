import { SITE_URL } from '../../config/endpoints';
import { getNumeralValue } from '../../services/util';
import {
  AuthorObj,
  EducationObj,
  ServerAuthorObj,
  ServerEducationObj,
  ServerWorkplaceObj,
  WorkplaceObj,
} from './dataTypes';

const mapEducationFromServer = (
  serverEducationObj: ServerEducationObj
): EducationObj => {
  return {
    degree: serverEducationObj.degree || '',
    institution: serverEducationObj.institution || '',
    isPresent: serverEducationObj.is_present ? true : false,
    start: serverEducationObj.start || '',
    end: serverEducationObj.end || '',
  };
};

const mapWorkplaceFromServer = (
  serverWorkplaceObj: ServerWorkplaceObj
): WorkplaceObj => {
  return {
    position: serverWorkplaceObj.position || '',
    workplace: serverWorkplaceObj.workplace || '',
    isPresent: serverWorkplaceObj.is_present ? true : false,
    start: serverWorkplaceObj.start || '',
    end: serverWorkplaceObj.end || '',
  };
};

export const mapAuthorFromServer = (
  serverAuthorObj: ServerAuthorObj
): AuthorObj => ({
  id: serverAuthorObj.id || 0,
  name: serverAuthorObj.name || '',
  username: serverAuthorObj.username || '',
  authorUrl: SITE_URL + '/authors/' + serverAuthorObj.username,
  email: serverAuthorObj.email || '',
  mobile: serverAuthorObj.mobile || '',
  avatar: serverAuthorObj.avatar || '',
  gender: serverAuthorObj.gender || '',
  profession: serverAuthorObj.profession || '',
  dob: serverAuthorObj.date_of_birth || '',
  city: serverAuthorObj.city || '',
  address: serverAuthorObj.address || '',
  country: serverAuthorObj.country || '',
  connected: serverAuthorObj.connected_with || [],
  isVerified: serverAuthorObj.is_verified ? true : false,
  isFollowing: serverAuthorObj.is_following ? true : false,
  quote: serverAuthorObj.quote || '',
  interests: serverAuthorObj.interests || [],
  about: serverAuthorObj.about || '',
  sharableUrl: serverAuthorObj.sharable_url || '',
  education: (serverAuthorObj.educations || []).map((iter) =>
    mapEducationFromServer(iter)
  ),
  workplaces: (serverAuthorObj.workplaces || []).map((iter) =>
    mapWorkplaceFromServer(iter)
  ),
  isSurveyRequired: serverAuthorObj.survey_needed ? true : false,
  ownTips: serverAuthorObj.counts?.tips || 0,
  thumbsUp: getNumeralValue(serverAuthorObj.counts?.thumbs_up) || 0,
  followers: serverAuthorObj.counts?.followers || 0,
  following: serverAuthorObj.counts?.followings || 0,
  views: serverAuthorObj.counts?.views || 0,
  enrolledTips: serverAuthorObj.counts?.enrolled_tips || 0,
  savedTips: serverAuthorObj.counts?.saved_tips || 0,
  facebook: serverAuthorObj.social_info?.facebook || '',
  twitter: serverAuthorObj.social_info?.twitter || '',
  linkedin: serverAuthorObj.social_info?.linkedin || '',
  youtube: serverAuthorObj.social_info?.youtube || '',
  personal: serverAuthorObj.social_info?.personal || '',
  cover: serverAuthorObj.cover_photo || '',
  language: serverAuthorObj.preferred_lang || '',
  expire_date: serverAuthorObj.expire_date || '',
});

export const mapEducationToServer = (
  educationObj: EducationObj
): ServerEducationObj => {
  return {
    degree: educationObj.degree || '',
    institution: educationObj.institution || '',
    is_present: educationObj.isPresent ? 1 : 0,
    start: educationObj.start || '',
    end: educationObj.end || '',
  };
};

export const mapWorkplaceToServer = (
  workplaceObj: WorkplaceObj
): ServerWorkplaceObj => {
  return {
    position: workplaceObj.position || '',
    workplace: workplaceObj.workplace || '',
    is_present: workplaceObj.isPresent ? 1 : 0,
    start: workplaceObj.start || '',
    end: workplaceObj.end || '',
  };
};
