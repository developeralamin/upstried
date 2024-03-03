import {
  SERVER_TIPS_TIMEZONE_ENDPOINT,
  SERVER_TIPS_TIMEZONE_SETTING_ENDPOINT,
} from '../../config/endpoints';
import { axioService, GET, POST } from '../../services/axiosService';
import { getAuthToken } from '../../services/authentication';
// import { LanguageObj, ServerLanguageObj } from './dataTypes';
// import { mapLanguageFromServer } from './mapper';

class TimezoneAPI {
  getTimezone = async () => {
    const response = await axioService(
      GET,
      SERVER_TIPS_TIMEZONE_ENDPOINT,
      {},
      null
    );
    return response?.data?.data;
  };

  getSettings = async () => {
    const response = await axioService(
      GET,
      SERVER_TIPS_TIMEZONE_SETTING_ENDPOINT,
      {},
      null
    );
    // console.log(response.data);
    return response?.data;
  };

  setTimezone = async (timezone: string) => {
    const token = getAuthToken();
    const response = await axioService(
      POST,
      SERVER_TIPS_TIMEZONE_SETTING_ENDPOINT,
      {
        general: {
          timezone,
        },
      },
      token
    );

    return response.data;
  };
}

export default new TimezoneAPI();
