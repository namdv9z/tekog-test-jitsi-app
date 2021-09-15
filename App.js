/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import Pushy from 'pushy-react-native';

import LoginScreen from './src/screens/Login';
import ConvoListScreen from './src/screens/ConvoList';
import { StoreProvider } from 'easy-peasy';
import store from './src/store';
import { JitsiCall } from './src/screens/JitsiCall';
import RNCallKeep from 'react-native-callkeep';

const Stack = createNativeStackNavigator();

const options = {
  ios: {
    appName: 'My app name',
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok',
    imageName: 'phone_account_icon',
    // Required to get audio in background when using Android 11
    foregroundService: {
      channelId: 'com.company.my',
      channelName: 'Foreground service for my app',
      notificationTitle: 'My app is running on background',
      notificationIcon: 'Path to the resource icon of the notification',
    },
  },
};

Pushy.setNotificationListener(async data => {
  // Print notification payload data
  console.log('Received notification: ' + JSON.stringify(data));

  let notificationTitle = 'Test Jisti Notification';
  let notificationText = data.message || 'Test notification';
  Pushy.notify(notificationTitle, notificationText, data);

  const { uuid, handle } = data;
  RNCallKeep.displayIncomingCall(uuid, handle);
  // Display basic system notification
});

const App = () => {
  useEffect(() => {
    // Start the Pushy service
    Pushy.listen();
    RNCallKeep.setup(options);
  }, []);

  return (
    <StoreProvider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              gestureEnabled: false,
              headerShown: false,
            }}>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={() => ({ headerShown: false })}
            />
            <Stack.Screen
              name="ConvoList"
              component={ConvoListScreen}
              options={() => ({})}
            />
            <Stack.Screen
              name="Call"
              component={JitsiCall}
              options={() => ({})}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </StoreProvider>
  );
};

export default App;
