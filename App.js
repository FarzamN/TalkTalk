import { StyleSheet, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import AppNavigationContainer from './src/navigation/AppNavigationContainer';
import { AuthProvider } from './src/context/Context';
import OneSignal from 'react-native-onesignal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import StartCounter from './src/screens/Home/StartCounter';
import Splash from './src/screens/authentication/SplashScreen';
const App = () => {

// 8756ec81-9a62-466c-83ff-3bdd09f82917
  const [loading, setLoading] = useState(true);
  console.log("ccccccc")
  useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId('8756ec81-9a62-466c-83ff-3bdd09f82917');
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response);
    });

    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        OneSignal.add;
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        notificationReceivedEvent.complete(notification);
      },
    );
    OneSignal.setNotificationOpenedHandler(notification => { });
    OneSignal.addSubscriptionObserver(async event => {
      if (event.to.isSubscribed) {
        const state = await OneSignal.getDeviceState();
        console.log('state.userId=======>', state.userId);
        await AsyncStorage.setItem('onesignaltoken', state.userId);
        console.log('onesignaltoken', state.userId)
      }
    });


    setTimeout(() => {
      SplashScreen.hide();
      setLoading(false);
    }, 2000);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //     setLoading(false);
  //   }, 3000);
  // });



  const iosSplash = () => {

  }

  return Platform.OS == 'ios' ? (
    <AuthProvider>
      {loading ? <Splash /> : <AppNavigationContainer />}

    </AuthProvider>

  ) : (
    <AuthProvider>
      <AppNavigationContainer />
    </AuthProvider>
  )
};

export default App;
// 8756ec81-9a62-466c-83ff-3bdd09f82917
// 8756ec81-9a62-466c-83ff-3bdd09f82917
const styles = StyleSheet.create({});
