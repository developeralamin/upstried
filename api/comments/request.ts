import { HTTP_FAILED_STATUS, HTTP_SUCCESS_STATUS } from '../../config/api';
import {
  SERVER_REACTION_ENDPOINT,
  SERVER_TIP_COMMENTS_VIEW_ENDPOINT,
  SERVER_TIP_COMMENT_DELETE_ENDPOINT,
  SERVER_TIP_COMMENT_EDIT_ENDPOINT,
  SERVER_TIP_COMMENT_STORE_ENDPOINT,
} from '../../config/endpoints';
import {
  COMMENT_SENT_SUCCESS_MESSAGE,
  COMMENT_UPDATED_SUCCESS_MESSAGE,
} from '../../config/messages';
import { axioService, GET, POST } from '../../services/axiosService';
import Api from '../API';
import { mapCommentMetaServerToClient, mapCommentServerToClient, mapCommentsServerToClient } from './mapper';
import { v4 as uuidv4 } from 'uuid';

class CommentsAPI extends Api {
  async getByTipId(request: any, token: any = null) {
    try {
      const params = { page: request.page };
      const response = await axioService(
        GET,
        this.mapEndpoint(
          SERVER_TIP_COMMENTS_VIEW_ENDPOINT,
          request.slug,
          ':slug'
        ),
        params,
        token
      );

      if (response && Api.isResponseSuccess(response.status)) {
        return {
          data: mapCommentsServerToClient(response.data.data),
          status: HTTP_SUCCESS_STATUS,
          total: response.data.meta.total,
          page: response.data.meta.current_page + 1,
        };
      }
      return { data: null, total: 0, status: HTTP_FAILED_STATUS };
    } catch (error) {
      console.error(error);
      return { data: null, total: 0, status: HTTP_FAILED_STATUS };
    }
  }
  async getByTipsSlug(request: any) {
    const { slug, token, page } = request;
    const params = { page };
    const response = await axioService(
      GET,
      this.mapEndpoint(
        SERVER_TIP_COMMENTS_VIEW_ENDPOINT,
        slug,
        ':slug'
      ),
      params,
      token
    );
    return {
      data: mapCommentsServerToClient(response.data.data),
      status: response.status,
      meta: mapCommentMetaServerToClient(response.data.meta)
    };
  }
  async thumbsup(params = {}, token = null) {
    try {
      params = {
        ...params,
        reaction_type: 'thumbs_up',
        reactionable_type: 'comment',
      };
      const response = await axioService(
        POST,
        SERVER_REACTION_ENDPOINT,
        params,
        token
      );
      if (response && Api.isResponseSuccess(response.status)) {
        return {
          data: response.data.data,
          status: HTTP_SUCCESS_STATUS,
        };
      }
      return { data: null, total: 0, status: HTTP_FAILED_STATUS };
    } catch (error) {
      console.error(error);
      return { data: null, total: 0, status: HTTP_FAILED_STATUS };
    }
  }
  async delete(request: any, params = {}, token = null) {
    try {
      params = { ...params, _method: 'delete' };

      const response = await axioService(
        POST,
        this.mapEndpoint(
          SERVER_TIP_COMMENT_DELETE_ENDPOINT,
          request.comment.uuid,
          ':commentId'
        ),
        params,
        token
      );

      if (response && Api.isResponseSuccess(response.status)) {
        return { data: request.comment, status: HTTP_SUCCESS_STATUS };
      }
      return { data: null, status: HTTP_FAILED_STATUS };
    } catch (error) {
      console.error(error);
      return { data: null, status: HTTP_FAILED_STATUS };
    }
  }

  async create(request: any) {
    try {
      const requestFormData = new FormData();

      requestFormData.append('comment', request.feedback);
      requestFormData.append('uuid', uuidv4());

      const response = await axioService(
        POST,
        this.mapEndpoint(
          SERVER_TIP_COMMENT_STORE_ENDPOINT,
          request.tipsSlug,
          ':slug'
        ),
        requestFormData
      );

      if (response && Api.isResponseSuccess(response.status)) {
        return {
          data: mapCommentServerToClient(response.data.data),
          status: HTTP_SUCCESS_STATUS,
          message: COMMENT_SENT_SUCCESS_MESSAGE,
        };
      }
      return { data: null, status: HTTP_FAILED_STATUS };
    } catch (error) {
      console.error(error);
      return { data: null, status: HTTP_FAILED_STATUS };
    }
  }

  async update(request: any) {
    try {
      const requestFormData = new FormData();

      requestFormData.append('comment', request.comment);

      if (request.parentId) {
        requestFormData.append('parent_comment', request.parentId);
      }
      requestFormData.append('_method', 'put');

      const response = await axioService(
        POST,
        this.mapEndpoint(
          SERVER_TIP_COMMENT_EDIT_ENDPOINT,
          request.commentId,
          ':commentId'
        ),
        requestFormData
      );

      if (response && Api.isResponseSuccess(response.status)) {
        return {
          data: mapCommentServerToClient(response.data.data),
          status: HTTP_SUCCESS_STATUS,
          message: COMMENT_UPDATED_SUCCESS_MESSAGE,
        };
      }
      return { data: null, status: HTTP_FAILED_STATUS };
    } catch (error) {
      console.error(error);
      return { data: null, status: HTTP_FAILED_STATUS };
    }
  }
}

export default new CommentsAPI();
