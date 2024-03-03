import { HTTP_FAILED_STATUS, HTTP_SUCCESS_STATUS } from '../../config/api';
import { SERVER_TAGS_FETCH_ENDPOINT } from '../../config/endpoints';
import { axioService, GET } from '../../services/axiosService';
import sessionStorageHandler from '../../services/sessionStorageHandler';
import Api from '../API';
import { mapCategoriesServerToClient } from './mapper';

class CategoryAPI extends Api {
  async all(params = {}, token = null) {
    try {
      const categories = this.getCategoriesFromCache();
      if (categories && categories.length > 0) {
        return {
          data: categories,
          status: HTTP_SUCCESS_STATUS,
        };
      }
      const response = await axioService(
        GET,
        SERVER_TAGS_FETCH_ENDPOINT,
        params,
        token
      );
      if (response && Api.isResponseSuccess(response.status)) {
        const categoriesResult = mapCategoriesServerToClient(
          response.data.data
        );
        sessionStorageHandler.save(categoriesResult, 'categories');
        return {
          data: categoriesResult,
          status: HTTP_SUCCESS_STATUS,
        };
      }
      return { data: [], status: HTTP_FAILED_STATUS };
    } catch (error) {
      return { data: [], status: HTTP_FAILED_STATUS };
    }
  }

  getCategoriesFromCache = () => {
    return sessionStorageHandler.get('categories');
  };
}

export default new CategoryAPI();
