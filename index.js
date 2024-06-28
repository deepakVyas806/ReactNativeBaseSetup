import 'react-native-gesture-handler';
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging'
// import GlobalFont from 'react-native-global-font'

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
});

// GlobalFont.applyGlobal('Roboto')

AppRegistry.registerComponent(appName, () => App);
