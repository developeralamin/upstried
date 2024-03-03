import { message } from 'antd';
import lodash from 'lodash';
import { HTTP_FAILED_STATUS, HTTP_SUCCESS_STATUS } from '../../config/api';
import {
  SERVER_CATEGORY_BASED_TIPS,
  SERVER_LIKE_TIPS,
  SERVER_PAYMENTS,
  SERVER_REACTION_ENDPOINT,
  SERVER_TIPS_AUDIO_UPLOAD,
  SERVER_TIPS_DISCARD_ENDPOINT,
  SERVER_TIPS_ENDPOINT,
  SERVER_TIPS_ENROLLED_FETCH_ENDPOINT,
  SERVER_TIPS_ENROLL_ENDPOINT,
  SERVER_TIPS_NOTIFICATION_SETTINGS_ENDPOINT,
  SERVER_TIPS_REPORT_STORE_ENDPOINT,
  SERVER_TIPS_REPORT_UNDO_ENDPOINT,
  SERVER_TIPS_SAVED_ENDPOINT,
  SERVER_TIPS_SAVED_FETCH_ENDPOINT,
  SERVER_TIP_DELETE_ENDPOINT,
  SERVER_TIP_DETAILS_ENDPOINT,
  SERVER_TIP_STORE_ENDPOINT,
  SERVER_TIP_UPDATE_ENDPOINT,
  SERVER_TIP_VIEW_ENDPOINT,
  SITE_URL,
} from '../../config/endpoints';
import {
  TIP_DELETE_FAILED_MESSAGE,
  TIP_DELETE_SUCCESS_MESSAGE,
  TIP_ENROLL_FAILED_MESSAGE,
  TIP_ENROLL_SUCCESS_MESSAGE,
  TIP_SAVED_FAILED_MESSAGE,
  TIP_SAVED_SUCCESS_MESSAGE,
} from '../../config/messages';
import {
  FetchTipsResponseInterface,
  TipsResponseInterface,
} from '../../interfaces/tips.interface';
import { getAuthToken } from '../../services/authentication';
import { GET, POST, axioService } from '../../services/axiosService';
import {
  removePendingAction,
  setPendingActions,
} from '../../services/pendingActions';
import Api from '../API';
import AccountsAPI from '../accounts/request';
import {
  mapClientToServer,
  mapTipsCollectionForList,
  mapTipsCollectionServerToClient,
  mapTipsMetaServerToClient,
  mapTipsServerToClient,
} from './mapper';
import { TipsFetchRequestInterface } from './request.d';
// import { getSessionInfo } from '../../services/cookieStorageSync';

class TipsAPI extends Api {
  async all(request: any, token = null, headers: any = null) {
    try {
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
      if (request['type']) {
        params['type'] = request.type;
      }
      let api = '';
      if (request.apiEndpoint) {
        api = this.mapEndpoint(
          request.apiEndpoint.url,
          request.apiEndpoint.value,
          request.apiEndpoint.needle
        );
      } else {
        api = SERVER_TIPS_ENDPOINT;
      }
      const response = await axioService(
        GET,
        api,
        params,
        token,
        true,
        headers
      );
      if (response && Api.isResponseSuccess(response.status) && response.data) {
        return {
          data: mapTipsCollectionServerToClient(response.data.data),
          total: response.data.meta.total,
          page: response.data.meta.current_page,
          next_page: response.data.meta.current_page + 1,
          current_page: response.data.meta.current_page,
          last_page: response.data.meta.last_page,
          status: HTTP_SUCCESS_STATUS,
        };
      }
      return { data: [], total: 0, status: HTTP_FAILED_STATUS };
    } catch (error) {
      console.error(error);
      return { data: [], total: 0, status: HTTP_FAILED_STATUS };
    }
  }

  /**
   * @description This method is used to fetch tips
   * @param request - TipsFetchRequestInterface
   * @returns TipsFetchResponseInterface
   */

  async fetchTips(
    request: TipsFetchRequestInterface,
    resolver?: any
  ): Promise<FetchTipsResponseInterface> {
    const endpoint = request.endpoint || SERVER_TIPS_ENDPOINT;
    let userInput: any = { ...request };
    userInput = request.params
      ? { ...userInput, ...request.params }
      : { ...userInput };
    userInput['brief'] = 1;
    userInput = lodash.omit(userInput, [
      'endpoint',
      'params',
      'token',
      'headers',
    ]);
    const token = request.token || null;
    const headers = request.headers || null;
    const response = await axioService(
      GET,
      endpoint,
      userInput,
      token,
      true,
      headers
    );
    if (resolver) {
      return resolver(response);
    }
    return {
      data: mapTipsCollectionForList(response.data.data),
      meta: mapTipsMetaServerToClient(response.data.meta),
      status: response.status,
    };
  }

  async enrolledTips(request: any, resolver: any) {
    const endpoint: string = request.endpoint;
    const params: any = request.params;
    const token = getAuthToken();
    const response = await axioService(
      GET,
      endpoint,
      { type: params.type },
      token
    );
    return resolver(response);
  }

  async getEnrolledTips(request: any, token = null) {
    try {
      const params: any = {};
      params['page'] = request.page;
      params['q'] = request.q;
      if (request.type) {
        params['type'] = request.type;
      }
      const response = await axioService(
        GET,
        SERVER_TIPS_ENROLLED_FETCH_ENDPOINT.replace(
          ':username',
          request.author
        ),
        params,
        token
      );
      if (response && Api.isResponseSuccess(response.status) && response.data) {
        return {
          data: mapTipsCollectionServerToClient(response.data.data),
          total: response.data.meta.total,
          page: response.data.meta.current_page,
          next_page: response.data.meta.current_page + 1,
          current_page: response.data.meta.current_page,
          last_page: response.data.meta.last_page,
          status: HTTP_SUCCESS_STATUS,
        };
      }
      return { data: [], total: 0, status: HTTP_FAILED_STATUS };
    } catch (error) {
      console.error(error);
      return { data: [], total: 0, status: HTTP_FAILED_STATUS };
    }
  }

  async getSavedTips(request: any, token = null) {
    try {
      const params: any = {};
      params['page'] = request.page;
      params['q'] = request.q;
      const response = await axioService(
        GET,
        SERVER_TIPS_SAVED_FETCH_ENDPOINT.replace(':username', request.author),
        params,
        token
      );
      if (response && Api.isResponseSuccess(response.status) && response.data) {
        return {
          data: mapTipsCollectionServerToClient(response.data.data),
          total: response.data.meta.total,
          page: response.data.meta.current_page,
          next_page: response.data.meta.current_page + 1,
          current_page: response.data.meta.current_page,
          last_page: response.data.meta.last_page,
          status: HTTP_SUCCESS_STATUS,
        };
      }
      return { data: [], total: 0, status: HTTP_FAILED_STATUS };
    } catch (error) {
      console.error(error);
      return { data: [], total: 0, status: HTTP_FAILED_STATUS };
    }
  }

  async getById(request: any, token = null) {
    try {
      const response = await axioService(
        GET,
        this.mapEndpoint(SERVER_TIP_VIEW_ENDPOINT, request.slug, ':slug'),
        {},
        token
      );

      if (response && Api.isResponseSuccess(response.status)) {
        return {
          data: mapTipsServerToClient(response.data.data),
          status: HTTP_SUCCESS_STATUS,
        };
      }
      return { data: {}, status: HTTP_FAILED_STATUS };
    } catch (error) {
      console.error(error);
      return { data: {}, status: HTTP_FAILED_STATUS };
    }
  }

  responseTips = (response: any) => ({
    data: mapTipsServerToClient(response.data.data),
    status: response.status,
  });

  async create(request: any): Promise<TipsResponseInterface> {
    const response = await axioService(
      POST,
      SERVER_TIP_STORE_ENDPOINT,
      mapClientToServer(request)
    );
    return this.responseTips(response);
  }

  async getBySlug(request: { id: string; token?: string }) {
    const { id, token } = request;
    const response = await axioService(
      GET,
      this.mapEndpoint(SERVER_TIP_DETAILS_ENDPOINT, id, ':id'),
      {},
      token
    );
    return this.responseTips(response);
  }

  async update(request: any): Promise<TipsResponseInterface> {
    const userInput = mapClientToServer(request);
    userInput['_method'] = 'put';
    const response = await axioService(
      POST,
      this.mapEndpoint(SERVER_TIP_UPDATE_ENDPOINT, request.tipsSlug, ':slug'),
      userInput
    );
    return this.responseTips(response);
  }

  async delete(request: any) {
    try {
      const response = await axioService(
        POST,
        this.mapEndpoint(SERVER_TIP_DELETE_ENDPOINT, request.slug, ':slug'),
        { _method: 'delete' }
      );
      if (response && Api.isResponseSuccess(response.status)) {
        return {
          data: request,
          message: TIP_DELETE_SUCCESS_MESSAGE,
          status: HTTP_SUCCESS_STATUS,
          redirectTo: '',
        };
      }
      return {
        data: null,
        message: TIP_DELETE_FAILED_MESSAGE,
        status: HTTP_FAILED_STATUS,
        redirectTo: '',
      };
    } catch (error) {
      return {
        data: null,
        message: TIP_DELETE_FAILED_MESSAGE,
        status: HTTP_FAILED_STATUS,
        redirectTo: '',
      };
    }
  }

  async save(request: any) {
    try {
      const response = await axioService(
        POST,
        this.mapEndpoint(SERVER_TIPS_SAVED_ENDPOINT, request.slug, ':slug'),
        { _method: 'put' },
        null,
        false
      );
      if (response && Api.isResponseSuccess(response.status)) {
        removePendingAction();
        return {
          data: mapTipsServerToClient(response.data.data),
          message: TIP_SAVED_SUCCESS_MESSAGE,
          status: HTTP_SUCCESS_STATUS,
          redirectTo: '',
        };
      }
      return {
        data: null,
        message: TIP_SAVED_FAILED_MESSAGE,
        status: HTTP_FAILED_STATUS,
        redirectTo: '',
      };
    } catch (error) {
      if ((error as any)?.response?.status !== 401) {
        removePendingAction();
      }
      if ((error as any)?.response?.status === 401) {
        setPendingActions({
          name: 'saveTips',
          query: { slug: request.slug },
          redirect_after_login: `${SITE_URL}/books/${request.slug}`,
        });
        AccountsAPI.logoutForcely();
      } else {
        message.error('Saved failed !');
        console.error(error);
      }
    }
  }

  async discard(request: any) {
    const response = await axioService(
      POST,
      this.mapEndpoint(SERVER_TIPS_DISCARD_ENDPOINT, request.slug, ':slug'),
      { _method: 'put' }
    );
    return {
      data: mapTipsServerToClient(response.data.data),
      status: response.status,
    };
  }

  async enroll(request: any) {
    try {
      const response = await axioService(
        POST,
        this.mapEndpoint(SERVER_TIPS_ENROLL_ENDPOINT, request.slug, ':slug'),
        { _method: 'put' },
        null,
        false
      );
      if (response && Api.isResponseSuccess(response.status)) {
        removePendingAction();
        return {
          data: mapTipsServerToClient(response.data.data),
          message: TIP_ENROLL_SUCCESS_MESSAGE,
          status: response.status,
          redirectTo: '',
        };
      }
      return {
        data: null,
        message: TIP_ENROLL_FAILED_MESSAGE,
        status: response.status,
        redirectTo: '',
      };
    } catch (error) {
      if ((error as any)?.response?.status !== 401) {
        removePendingAction();
      }
      if ((error as any)?.response?.status === 401) {
        setPendingActions({
          name: 'enroll',
          query: { slug: request.slug },
          redirect_after_login: `${SITE_URL}/books/${request.slug}`,
        });
        AccountsAPI.logoutForcely();
      } else {
        message.error('Enrolled failed !');
        console.error(error);
      }
    }
  }

  async doThumbsUp(request: any) {
    return await axioService(POST, SERVER_REACTION_ENDPOINT, {
      reaction_type: 'thumbs_up',
      reactionable_id: request.id,
      reactionable_type: 'tips',
    });
  }

  async toggleNotificationSettings(request: any) {
    try {
      const response = await axioService(
        POST,
        this.mapEndpoint(
          SERVER_TIPS_NOTIFICATION_SETTINGS_ENDPOINT,
          request.slug,
          ':slug'
        ),
        {
          mute: request.mute,
        }
      );
      if (response && Api.isResponseSuccess(response.status)) {
        return {
          data: response.data.data,
          message: '',
          status: HTTP_SUCCESS_STATUS,
          redirectTo: '',
        };
      }
      return {
        data: null,
        message: '',
        status: HTTP_FAILED_STATUS,
        redirectTo: '',
      };
    } catch (error) {
      return {
        data: null,
        message: '',
        status: HTTP_FAILED_STATUS,
        redirectTo: '',
      };
    }
  }

  async report(request: any) {
    try {
      const response = await axioService(
        POST,
        this.mapEndpoint(
          SERVER_TIPS_REPORT_STORE_ENDPOINT,
          request.slug,
          ':slug'
        ),
        {
          description: request.report,
        }
      );
      if (response && Api.isResponseSuccess(response.status)) {
        return {
          data: response.data.data,
          message: 'You reported successfully.',
          status: 200,
          redirectTo: '',
        };
      }
      return {
        data: null,
        message: 'Something is wrong, please try again',
        status: HTTP_FAILED_STATUS,
        redirectTo: '',
      };
    } catch (error) {
      return {
        data: null,
        message: 'Something is wrong, please try again',
        status: HTTP_FAILED_STATUS,
        redirectTo: '',
      };
    }
  }

  async undoReport(request: any) {
    try {
      let url = SERVER_TIPS_REPORT_UNDO_ENDPOINT.replace(':slug', request.slug);
      url = SERVER_TIPS_REPORT_UNDO_ENDPOINT.replace(
        ':reportId',
        request.reportId
      );
      const response = await axioService(POST, url, {
        _method: 'delete',
      });
      if (response && Api.isResponseSuccess(response.status)) {
        return {
          data: response.data.data,
          message: 'Undoing report is done successfully',
          status: 200,
          redirectTo: '',
        };
      }
      return {
        data: null,
        message: 'Something is wrong, please try again',
        status: HTTP_FAILED_STATUS,
        redirectTo: '',
      };
    } catch (error) {
      return {
        data: null,
        message: 'Something is wrong, please try again',
        status: HTTP_FAILED_STATUS,
        redirectTo: '',
      };
    }
  }
  //Tips Audio Upload
  async audioUpload(data: any) {
    const response = await axioService(POST, SERVER_TIPS_AUDIO_UPLOAD, data);
    return response;
  }

  async payments(data: any, type: any) {
    const endpoint = `${SERVER_PAYMENTS.replace(':type', type)}`;
    const response = await axioService(POST, endpoint, data);
    return response;
  }

  async likeTips() {
    const response = await axioService(GET, SERVER_LIKE_TIPS);
    return response;
  }

  async categoryBasedTips(slug: any) {
    const endpoint = `${SERVER_CATEGORY_BASED_TIPS.replace(':slug', slug)}`;
    const response = await axioService(GET, endpoint);
    return response;
  }
}

export default new TipsAPI();
