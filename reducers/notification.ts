import lodash from 'lodash';
import { NotificationObj } from '../api/notifications/dataTypes';

/** The reducer name */
export const reducerName = 'notifications';

// actions
/** action types */
export const SET_NOTIFICATIONS =
  'virtunus/reducer/notifications/SET_NOTIFICATIONS';
/** action types */
export const SET_NOTIFICATION =
  'virtunus/reducer/notifications/SET_NOTIFICATION';
/** action types */
export const ADD_NOTIFICATIONS =
  'virtunus/reducer/notifications/ADD_NOTIFICATIONS';
/** action types */
export const MARK_NOTIFICATION_AS_READ =
  'virtunus/reducer/notifications/MARK_NOTIFICATION_AS_READ';
/** action types */
export const MARK_ALL_NOTIFICATIONS_AS_READ =
  'virtunus/reducer/notifications/MARK_ALL_NOTIFICATIONS_AS_READ';
/** action types */
export const DELETE_NOTIFICATIONS =
  'virtunus/reducer/notifications/DELETE_NOTIFICATIONS';

/** interface for SET_NOTIFICATIONS action */
export interface SetNotificationsAction {
  notifications: NotificationObj[];
  type: typeof SET_NOTIFICATIONS;
}

/** interface for SET_NOTIFICATION action */
export interface SetNotificationAction {
  notification: NotificationObj;
  type: typeof SET_NOTIFICATION;
}

/** interface for ADD_NOTIFICATIONS action */
export interface AddNotificationsAction {
  notifications: NotificationObj[];
  type: typeof ADD_NOTIFICATIONS;
}

/** interface for DELETE_NOTIFICATIONS action */
export interface DeleteNotificationsAction {
  notificationIds: string[];
  type: typeof DELETE_NOTIFICATIONS;
}

/** interface for MARK_NOTIFICATION_AS_READ action */
export interface MarkNotificationAsRead {
  notificationId: string;
  type: typeof MARK_NOTIFICATION_AS_READ;
}

/** interface for MARK_ALL_NOTIFICATIONS_AS_READ action */
export interface MarkAllNotificationsAsRead {
  type: typeof MARK_ALL_NOTIFICATIONS_AS_READ;
}

/** Create type for notifications reducer actions */
export type NotificationsActionTypes =
  | SetNotificationsAction
  | SetNotificationAction
  | AddNotificationsAction
  | DeleteNotificationsAction
  | MarkNotificationAsRead
  | MarkAllNotificationsAsRead;

// action creators

/** set notifications action creator
 * @param {NotificationObj[]} notifications - the notifications to set
 * @returns {SetNotificationsAction} - an action to set notifications in store
 */
export const setNotifications = (
  notifications: NotificationObj[]
): SetNotificationsAction => ({
  notifications,
  type: SET_NOTIFICATIONS,
});

/** set notifications action creator
 * @param {NotificationObj} notification - the notification to set
 * @returns {SetNotificationAction} - an action to set notifications in store
 */
export const setNotification = (
  notification: NotificationObj
): SetNotificationAction => ({
  notification,
  type: SET_NOTIFICATION,
});

/** add notifications action creator
 * @param {NotificationObj[]} notifications - the notifications to add
 * @returns {AddNotificationsAction} - an action to add notifications in store
 */
export const addNotifications = (
  notifications: NotificationObj[]
): AddNotificationsAction => ({
  notifications,
  type: ADD_NOTIFICATIONS,
});

/** delete notifications action creator
 * @param {string[]} notificationIds - the notification ids to delete
 * @returns {DeleteNotificationsAction} - an action to delete notifications in store
 */
export const deleteNotifications = (
  notificationIds: string[]
): DeleteNotificationsAction => ({
  notificationIds,
  type: DELETE_NOTIFICATIONS,
});

/** mark notifications as read action creator
 * @param {string} notificationId - the notification id to mark
 * @returns {MarkNotificationAsRead} - an action to mark notifications in store
 */
export const markNotificationAsRead = (
  notificationId: string
): MarkNotificationAsRead => ({
  notificationId,
  type: MARK_NOTIFICATION_AS_READ,
});

/** mark all notifications as read action creator
 * @returns {MarkAllNotificationsAsRead} - an action to mark notifications in store
 */
export const markAllNotificationsAsRead = (): MarkAllNotificationsAsRead => ({
  type: MARK_ALL_NOTIFICATIONS_AS_READ,
});

// the reducer

/** interface for notifications state in redux store */
type NotificationsState = NotificationObj[];

/** initial notifications state */
const initialState: NotificationsState = [];

/** the notifications reducer function */
export default function reducer(
  state: NotificationsState = initialState,
  action: NotificationsActionTypes
): NotificationsState {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return action.notifications;
    case SET_NOTIFICATION:
      return [action.notification, ...state];
    case ADD_NOTIFICATIONS:
      return lodash.orderBy(
        [
          ...lodash.filter(state, (iterNotification: NotificationObj) =>
            lodash.find(action.notifications, {
              id: iterNotification.id,
            })
              ? false
              : true
          ),
          ...action.notifications,
        ],
        ['createdAt'],
        ['desc']
      );
    case DELETE_NOTIFICATIONS:
      return lodash.filter(
        state,
        (iterNotification: NotificationObj) =>
          !action.notificationIds.includes(iterNotification.id)
      );
    case MARK_NOTIFICATION_AS_READ:
      return lodash.map(state, (iterNotification: NotificationObj) => {
        return action.notificationId === iterNotification.id
          ? { ...iterNotification, isRead: true }
          : iterNotification;
      });
    case MARK_ALL_NOTIFICATIONS_AS_READ:
      return lodash.map(state, (iterNotification: NotificationObj) => {
        return !iterNotification.isRead
          ? { ...iterNotification, isRead: true }
          : iterNotification;
      });
    default:
      return state;
  }
}

// selectors

/** returns the notifications list
 * @param {NotificationsState} state - the notification store
 * @return { NotificationObj[] } - the existing notifications
 */
export function getNotifications(state: NotificationsState): NotificationObj[] {
  return (state as any)[reducerName];
}

/** returns the unread notification count
 * @param {NotificationsState} state - the notification store
 * @return { NotificationObj[] } - the existing unread notifications count
 */
export function getUnreadNotificationsCount(state: NotificationsState): number {
  return lodash.filter((state as any)[reducerName], { isRead: false }).length;
}

/** returns true if notification id is present; otherwise false
 * @param {NotificationsState} state - the notification store
 * @param {string} notificationId - the notifcation id
 * @return { boolean } - returns true if notification id is present; otherwise false
 */
export function checkIfNotificationPresent(
  state: NotificationsState,
  notificationId: string
): boolean {
  return lodash.find((state as any)[reducerName], { id: notificationId })
    ? true
    : false;
}
