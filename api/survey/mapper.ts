import { ServerSurveyObj, SurveyObj } from './dataTypes';

/**
 * maps the server survey data structure to client
 * @param {ServerSurveyObj} serverSurveyObj - the server survey data structure
 * @returns {SurveyObj} - the local survey structure
 */
export const mapSurveyFromServer = (
  serverSurveyObj: ServerSurveyObj
): SurveyObj => ({
  gender: serverSurveyObj.gender,
  city: serverSurveyObj.region.city,
  country: serverSurveyObj.region.country,
  interests: serverSurveyObj.interests,
});

/**
 * maps the client survey data structure to server
 * @param {SurveyObj}  surveyObj - the local survey data structure
 * @returns {ServerSurveyObj} - the server survey data structure
 */
export const mapSurveyToServer = (surveyObj: SurveyObj): ServerSurveyObj => ({
  gender: surveyObj.gender,
  region: {
    city: surveyObj.city,
    country: surveyObj.country,
  },
  interests: surveyObj.interests,
});
