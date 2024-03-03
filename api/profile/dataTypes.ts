import {
  AuthorObj,
  EducationObj,
  ServerAuthorObj,
  WorkplaceObj,
} from '../authors/dataTypes';

export type ProfileObj = AuthorObj;

export type ServerProfileObj = ServerAuthorObj;

export interface ProfileAccountObj {
  username: string;
  email: string;
  password: string;
}

export interface SocialObj {
  facebook: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  personal: string;
}

export interface ProfileFormObj {
  name: string;
  city: string;
  country: string;
  gender: string;
  workplaces: WorkplaceObj[];
  education: EducationObj[];
  quote: string;
  about: string;
}
