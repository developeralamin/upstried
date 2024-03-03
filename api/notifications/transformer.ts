import { NotificationObj, ServerNotificationObj } from './dataTypes';

export const transformNotificationFromServer = (
  serverNotificationObj: ServerNotificationObj
): NotificationObj => {
  return {
    id: serverNotificationObj.id,
    url: serverNotificationObj.url,
    visibility: serverNotificationObj.visibility ? true : false,
    category: serverNotificationObj.category,
    target: serverNotificationObj.target,
    enrollmentId: serverNotificationObj.enrollment_id,
    type: serverNotificationObj.type,
    declineUrl: serverNotificationObj.decline_url,
    acceptUrl: serverNotificationObj.accept_url,
    message: serverNotificationObj.message,
    createdAt: serverNotificationObj.created_at,
    subject: serverNotificationObj.subject || null,
    object: serverNotificationObj.object || null,
    isRead: serverNotificationObj.read_at ? true : false,
  };
};
