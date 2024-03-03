import { getAuthToken } from './../../services/authentication';
import {
  SERVER_SURVEY_ENDPOINT,
  SERVER_SURVEY_INTERESTS_ENDPOINT,
} from '../../config/endpoints';
import { getAuthUsername } from '../../services/authentication';
import { axioService, GET, POST } from '../../services/axiosService';
import { InterestObj, SurveyObj } from './dataTypes';
import { mapSurveyToServer } from './mapper';

export class InterestsAPI {
  /**
   * fetches the list of interests from server
   * @returns {Promise<InterestObj[]>} - the list of interests present in survey
   */
  public get = async (): Promise<InterestObj[]> => {
    const response = await axioService(
      GET,
      SERVER_SURVEY_INTERESTS_ENDPOINT,
      {},
      false
    );
    return response?.data?.data || [];
  };
}

export class SurveyAPI {
  post = async (survyObj: SurveyObj) => {
    await axioService(
      POST,
      SERVER_SURVEY_ENDPOINT.replace(':username', getAuthUsername()),
      mapSurveyToServer(survyObj),
      getAuthToken()
    );
  };
}
