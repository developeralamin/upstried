import { SERVER_TIPS_LANGUAGE_ENDPOINT } from '../../config/endpoints';
import { axioService, GET } from '../../services/axiosService';
import { LanguageObj, ServerLanguageObj } from './dataTypes';
import { mapLanguageFromServer } from './mapper';

class LanguageAPI {
  get = async (): Promise<LanguageObj[]> => {
    const response = await axioService(
      GET,
      SERVER_TIPS_LANGUAGE_ENDPOINT,
      {},
      null
    );
    return response?.data?.data.map((iter: ServerLanguageObj) =>
      mapLanguageFromServer(iter)
    );
  };
}

export default LanguageAPI;
