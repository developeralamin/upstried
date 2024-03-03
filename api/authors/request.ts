import { HTTP_FAILED_STATUS, HTTP_SUCCESS_STATUS } from '../../config/api';
import {
  SERVER_AUTHORS_ENDPOINT,
  SERVER_AUTHORS_VIEW_ENDPOINT,
  SERVER_AUTHOR_BLOCK_ENDPOINT,
  SERVER_AUTHOR_BLOCK_LIST_ENDPOINT,
  SERVER_AUTHOR_FOLLOWERS_ENDPOINT,
  SERVER_AUTHOR_FOLLOWING_ENDPOINT,
  SERVER_AUTHOR_FOLLOW_ENDPOINT,
  SERVER_AUTHOR_UNBLOCK_ENDPOINT,
  SERVER_AUTHOR_UNFOLLOW_ENDPOINT,
} from '../../config/endpoints';
import { axioService, GET, POST } from '../../services/axiosService';
import Api from '../API';
import { mapAuthorFromServer } from './mapper';

class ServerAuthorsAPI extends Api {
  all = async (request?: any, token = null) => {
    let params: any = {};

    if (request.apiEndpointParams) {
      params = { ...request.apiEndpointParams };
    }
    params['category'] = request.category;
    if (request.preference) {
      params['preference'] = request.preference;
    }
    params['category'] = request.category;
    params['author'] = request.author;
    params['tags'] = request.tags;
    params['q'] = request.q;
    params['page'] = request.page;

    const response = await axioService(
      GET,
      SERVER_AUTHORS_ENDPOINT,
      params,
      token
    );
    const responseData: any = response?.data?.data.map((author: any) =>
      mapAuthorFromServer(author)
    );
    if (responseData) {
      return {
        data: responseData,
        total: response?.data.meta.total,
        page: response?.data.meta.current_page,
        next_page: response?.data.meta.current_page + 1,
        current_page: response?.data.meta.current_page,
        last_page: response?.data.meta.last_page,
        status: HTTP_SUCCESS_STATUS,
      };
    }
  };

  get = async (request?: any) => {
    const params: any = {};

    const response = await axioService(
      GET,
      this.mapEndpoint(
        SERVER_AUTHORS_VIEW_ENDPOINT,
        request.username,
        ':username'
      ),
      params,
      request.token
    );
    if (response && Api.isResponseSuccess(response.status)) {
      const responseData: any = mapAuthorFromServer(response?.data?.data);
      if (responseData) {
        return {
          data: responseData,
          status: HTTP_SUCCESS_STATUS,
        };
      }
    }
  };

  getAuthorFollowings = async (request?: any) => {
    const params: any = {};
    params['q'] = request.q;
    params['page'] = request.page;

    const response = await axioService(
      GET,
      this.mapEndpoint(
        SERVER_AUTHOR_FOLLOWING_ENDPOINT,
        request.username,
        ':username'
      ),
      params,
      null
    );
    const responseData: any = response?.data?.data.map((author: any) =>
      mapAuthorFromServer(author)
    );
    if (response && Api.isResponseSuccess(response.status)) {
      return {
        data: responseData,
        total: response?.data.meta.total,
        page: response?.data.meta.current_page,
        next_page: response?.data.meta.current_page + 1,
        current_page: response?.data.meta.current_page,
        last_page: response?.data.meta.last_page,
        status: HTTP_SUCCESS_STATUS,
      };
    }
  };

  getAuthorFollowers = async (request?: any) => {
    const params: any = {};
    params['q'] = request.q;
    params['page'] = request.page;
    const response = await axioService(
      GET,
      this.mapEndpoint(
        SERVER_AUTHOR_FOLLOWERS_ENDPOINT,
        request.username,
        ':username'
      ),
      params,
      null
    );
    const responseData: any = response?.data?.data.map((author: any) =>
      mapAuthorFromServer(author)
    );
    if (response && Api.isResponseSuccess(response.status)) {
      return {
        data: responseData,
        total: response?.data.meta.total,
        page: response?.data.meta.current_page,
        next_page: response?.data.meta.current_page + 1,
        current_page: response?.data.meta.current_page,
        last_page: response?.data.meta.last_page,
        status: HTTP_SUCCESS_STATUS,
      };
    }
  };

  follow = async (request?: any) => {
    try {
      const params: any = {};
      const response = await axioService(
        POST,
        this.mapEndpoint(
          SERVER_AUTHOR_FOLLOW_ENDPOINT,
          request.username,
          ':username'
        ),
        params,
        null
      );
      if (response && Api.isResponseSuccess(response.status)) {
        return {
          data: response.data,
          status: HTTP_SUCCESS_STATUS,
        };
      }        
    } catch (error) {
      return {
        data: null,
        status: HTTP_FAILED_STATUS,
      };    
    }
  };

  unFollow = async (request?: any) => {
    try {
      const params: any = {};
      const response = await axioService(
        POST,
        this.mapEndpoint(
          SERVER_AUTHOR_UNFOLLOW_ENDPOINT,
          request.username,
          ':username'
        ),
        params,
        null
      );
      if (response && Api.isResponseSuccess(response.status)) {
        return {
          data: response.data,
          status: HTTP_SUCCESS_STATUS,
        };
      }
        
    } catch (error) {
      return {
        data: null,
        status: HTTP_FAILED_STATUS,
      };    
    }
  };

  block = async (request?: any) => {
    const params: any = {};
    const response = await axioService(
      POST,
      this.mapEndpoint(
        SERVER_AUTHOR_BLOCK_ENDPOINT,
        request.username,
        ':username'
      ),
      params,
      null
    );
    if (response && Api.isResponseSuccess(response.status)) {
      return {
        data: response.data,
        status: HTTP_SUCCESS_STATUS,
        message: 'Author blocked successfully',
      };
    }
    return {
      data: '',
      status: HTTP_FAILED_STATUS,
      message: 'Something went wrong',
    };
  };
  getBlockList = async (request?: any) => {
    const params: any = {};
    const response = await axioService(
      GET,
      this.mapEndpoint(
        SERVER_AUTHOR_BLOCK_LIST_ENDPOINT,
        request.username,
        ':username'
      ),
      params,
      null
    );
    if (response && Api.isResponseSuccess(response.status)) {
      return {
        data: response.data,
        status: HTTP_SUCCESS_STATUS,
      };
    }
  };
  unblock = async (request?: any) => {
    const params: any = {};
    const response = await axioService(
      POST,
      this.mapEndpoint(
        SERVER_AUTHOR_UNBLOCK_ENDPOINT,
        request.username,
        ':username'
      ),
      params,
      null
    );
    if (response && Api.isResponseSuccess(response.status)) {
      return {
        data: response.data,
        status: HTTP_SUCCESS_STATUS,
      };
    }
  };
}

export default new ServerAuthorsAPI();
