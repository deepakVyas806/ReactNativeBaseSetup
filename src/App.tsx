
import React, { useEffect } from 'react';
import NavigationContainer from './navigation';
import { LogBox } from "react-native"
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { getToken, pushNotificationConfiguration, requestUserPermission } from './utills/push_notification/push_notification';


const App = () => {
  useEffect(() => {
    try {
      // Push notification
      // requestUserPermission();
      // getToken();
      // pushNotificationConfiguration()
    }
    catch (ex) {
      console.log(ex)
    }
    // messageListener();
  }, [])

  if (!__DEV__) {
    console.log = () => { };
  }
  if (__DEV__) {
    LogBox.ignoreLogs(['Warning: Each', 'Warning: Failed', "EventEmitter.removeListener"]);
    LogBox.ignoreAllLogs(true);
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;

