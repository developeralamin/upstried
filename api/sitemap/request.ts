import {
  SERVER_TIPS_SITEMAP_ENDPOINT,
  SERVER_AUTHOR_SITEMAP_ENDPOINT,
} from './../../config/endpoints';
import { axioService, GET } from '../../services/axiosService';
import Api from '../API';
import { HTTP_FAILED_STATUS } from '../../config/api';

class SitemapAPI extends Api {
  async getTips(request: any) {
    try {
      const params: any = {};
      params['page'] = request.page;
      const response = await axioService(
        GET,
        SERVER_TIPS_SITEMAP_ENDPOINT,
        params
      );
      if (response && Api.isResponseSuccess(response.status) && response.data) {
        return {
          data: response.data.data,
          total: response.data.meta.total,
          page: response.data.meta.current_page,
          next_page: response.data.meta.current_page + 1,
          current_page: response.data.meta.current_page,
          last_page: response.data.meta.last_page,
          status: 200,
          per_page: response.data.meta.per_page,
        };
      }
      return { data: [], total: 0, status: HTTP_FAILED_STATUS };
    } catch (error) {
      console.error(error);
      return { data: [], total: 0, status: HTTP_FAILED_STATUS };
    }
  }
  async getAuthors(request: any) {
    try {
      const params: any = {};
      params['page'] = request.page;
      const response = await axioService(
        GET,
        SERVER_AUTHOR_SITEMAP_ENDPOINT,
        params
      );
      if (response && Api.isResponseSuccess(response.status) && response.data) {
        return {
          data: response.data.data,
          total: response.data.meta.total,
          page: response.data.meta.current_page,
          next_page: response.data.meta.current_page + 1,
          current_page: response.data.meta.current_page,
          last_page: response.data.meta.last_page,
          status: 200,
          per_page: response.data.meta.per_page,
        };
      }
      return { data: [], total: 0, status: HTTP_FAILED_STATUS };
    } catch (error) {
      console.error(error);
      return { data: [], total: 0, status: HTTP_FAILED_STATUS };
    }
  }
}

export default new SitemapAPI();
