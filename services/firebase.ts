import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { NotificationObj } from '../api/notifications/dataTypes';
import { transformNotificationFromServer } from '../api/notifications/transformer';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { NotificationAPI } from '../api/notifications/request';
import { getAuthUsername } from './authentication';
// import { notification } from 'antd';

const firebaseConfig = {
  apiKey: 'AIzaSyDTQNUqoPmEdV2h7WRT4dfhFXp4OyAbTus',
  authDomain: 'virtunus-todo.firebaseapp.com',
  databaseURL: 'https://virtunus-todo-default-rtdb.firebaseio.com',
  projectId: 'virtunus-todo',
  storageBucket: 'virtunus-todo.appspot.com',
  messagingSenderId: '618046938393',
  appId: '1:618046938393:web:a49c33f0f87dd45b7ef988',
  measurementId: 'G-04QLD2X15B',
};

const FIREBASE_WEB_VAPID_KEY =
  'BCwQhNH7AVq1ANKcYd_MvUCkdhqpaKaJXfFF7hPdHtyRkXKbWbhmnipOGZXfW4eRlfkk6d0VnxA8B08KcSrhGPs';

/** initialize the firebase config */

export const notificationChannelInitialization = (
  addNotifications: (reqNotification: NotificationObj[]) => void
) => {

  /** notifications */

  /** subscribe to the user notification channel */
  const notificationLocation = ref(
    getDatabase(initializeApp(firebaseConfig)),
    'tips/notifications/' + getAuthUsername()
  );

  onValue(notificationLocation, (snapshot: any) => {
    const data = snapshot.val();
    if (data) {
      addNotifications([transformNotificationFromServer(data)]);
    }
  });
};

export const initiliazePushNotifications = () => {
  const messaging = getMessaging(initializeApp(firebaseConfig));
  getToken(messaging, { vapidKey: FIREBASE_WEB_VAPID_KEY })
    .then(async (currentToken) => {
      const existingDeviceToken =
        localStorage.getItem('firebase_device_token') || '';
      if (currentToken && existingDeviceToken !== currentToken) {
        // Send the token to your server and update the UI if necessary
        try {
          await new NotificationAPI().requestPushToken(currentToken);
          localStorage.setItem('firebase_device_token', currentToken);
        } catch (exception) {
          console.error(exception);
        }
      } else {
        // Show permission request UI
        console.error(
          'No registration token available. Request permission to generate one.'
        );
      }
    })
    .catch((err) => {
      console.error('An error occurred while retrieving token. ', err);
    });

  /** Enables push notifications on foreground */
  // onMessage(getMessaging(), (payload) => {
  //   notification.open({
  //     message: payload.notification?.title,
  //     description: payload.notification?.body,
  //   });
  // });
};
