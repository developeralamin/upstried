import { getAuthToken } from './../../services/authentication';
import {
  SERVER_DEVICE_TOKEN_ENDPOINT,
  SERVER_NOTIFICATIONS_ENDPOINT,
} from '../../config/endpoints';
import { axioService, GET, POST } from '../../services/axiosService';
import { NotificationObj, ServerNotificationObj } from './dataTypes';
import { transformNotificationFromServer } from './transformer';

export class NotificationAPI {
  fetchNotificationFromServer = async (
    page: number
  ): Promise<NotificationObj[]> => {
    const token = getAuthToken();
    const response = await axioService(
      GET,
      SERVER_NOTIFICATIONS_ENDPOINT + '?app=tips&page=' + page.toString(),
      {},
      token
    );
    return response.data.data.map(
      (iterNotification: ServerNotificationObj): NotificationObj =>
        transformNotificationFromServer(iterNotification)
    );
  };

  requestAllNotificationsAsRead = async () => {
    const token = getAuthToken();
    await axioService(
      POST,
      SERVER_NOTIFICATIONS_ENDPOINT + '/mark-all-as-read?app=tips',
      {},
      token
    );
  };

  requestNotificationAsRead = async (notificationId: string) => {
    const token = getAuthToken();
    await axioService(
      POST,
      SERVER_NOTIFICATIONS_ENDPOINT +
      '/' +
      notificationId +
      '/mark-as-read?app=tips',
      {},
      token
    );
  };

  requestPushToken = async (device_token: string) => {
    const token = getAuthToken();
    await axioService(
      POST,
      SERVER_DEVICE_TOKEN_ENDPOINT,
      {
        device_token,
        device_name: (window.navigator as any)?.userAgentData?.platform || '',
        app: 'tips',
      },
      token
    );
  };
}
