import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { useDispatch } from 'react-redux';
import { setPushToken } from '../../config/global_variables';

export async function requestUserPermission() {
  console.log("token")
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
  }
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
}
export async function getToken() {
  const token = await messaging().getToken();
  console.log("token = ", token);
  setPushToken(token);
  // const dispatch = useDispatch();
  // dispatch(setPushNotificationToken(token));
}
export const pushNotificationConfiguration = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      //   console.log('REMOTE NOTIFICATION ==>', notification);

      // Check if the app is in the foreground
      if (notification.foreground) {
        // Display an alert or a modal with the notification details
        console.log(notification.message);
        // Alert.alert('Notification Received', notification.message.toString());
      }
    },
    // Other configuration...
  })
}