import React, {useEffect} from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoginScreen from '../screens/UserRegistration/LoginScreen'
import MainTabNavigator from './MainTabNavigator';
import firebaseSDK from '../service/firebaseSDK';
import { ActivityIndicator } from 'react-native-paper';

import { View } from 'react-native';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Auth: LoginScreen,  
    App: MainTabNavigator,

  }),  
  {
    initialRouteName: 'Auth',
  }
);

