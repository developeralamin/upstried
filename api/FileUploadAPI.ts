import { HTTP_FAILED_STATUS, HTTP_SUCCESS_STATUS } from '../config/api';
import { SERVER_FILE_UPLOAD_ENDPOINT } from '../config/endpoints';
import { axioService, POST } from '../services/axiosService';
import API from './API';

class FileUploadAPI extends API {
  async upload(request: any, token = null) {
    try {
      const requestFormData = new FormData();
      requestFormData.append('attachment', request.attachment);
      requestFormData.append('privacy', 'public');

      const response = await axioService(
        POST,
        SERVER_FILE_UPLOAD_ENDPOINT,
        requestFormData,
        token
      );

      if (response && API.isResponseSuccess(response.status)) {
        return { data: response.data, status: HTTP_SUCCESS_STATUS };
      }

      return { data: null, status: HTTP_FAILED_STATUS };
    } catch (error) {
      console.error(error);
      return { data: null, status: HTTP_FAILED_STATUS };
    }
  }

  async uploadAttachment(request: any, token = null, mapper: any = null) {
    const requestFormData = new FormData();
    requestFormData.append('attachment', request.attachment);
    requestFormData.append('privacy', 'public');

    const response = await axioService(
      POST,
      SERVER_FILE_UPLOAD_ENDPOINT,
      requestFormData,
      token
    );
    return {
      data: mapper ? mapper(response.data) : this.mapAttachment(response.data),
      status: response.status,
    };
  }

  mapAttachment = (attachment: any) => {
    return {
      url: attachment.url,
      resourceUrl: attachment.resourceUrl || '',
      type: attachment.type || 'image',
      vendor: attachment.vendor || '',
    };
  };
}

export default new FileUploadAPI();
