/** survey related data structure */

export interface SurveyObj {
  gender: string;
  city: string;
  country: string;
  interests: string[];
}

export interface ServerSurveyObj {
  gender: string;
  region: {
    city: string;
    country: string;
  };
  interests: string[];
}

/** interests related data structure */

export interface InterestObj {
  uuid: string;
  name: string;
  image: string;
}
