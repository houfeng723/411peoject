import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/Home/HomeScreen';
import TestScreen from '../screens/Home/Test';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import SearchStudyScreen from '../screens/Search/SearchStudy';
import AddEventScreen from '../screens/AddEvent/AddEventScreen';
import AddStudyScreen from '../screens/AddEvent/AddStudyScreen';
import AddSportsScreen from '../screens/AddEvent/AddSportsScreen';
import DeleteStudyScreen from '../screens/AddEvent/DeleteStudyScreen';
import DeleteSportsScreen from '../screens/AddEvent/DeleteSportsScreen';
import DeleteRideScreen from '../screens/AddEvent/DeleteRideScreen';
import AddRideScreen from '../screens/AddEvent/AddRideScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import UpdateStudyScreen from '../screens/AddEvent/UpdateStudyScreen';
import UpdateSportsScreen from '../screens/AddEvent/UpdateSportsScreen';
import UpdateRideScreen from '../screens/AddEvent/UpdateRideScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Test: TestScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused} 
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Search: SearchScreen,
    SearchStudy: SearchStudyScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const AddStack = createStackNavigator(
  {
    Add: AddEventScreen,
    Study: AddStudyScreen,
    Sports: AddSportsScreen,
    Ride: AddRideScreen,
    DeleteStudy: DeleteStudyScreen,
    DeleteSports: DeleteSportsScreen,
    DeleteRide: DeleteRideScreen,
    UpdateStudy: UpdateStudyScreen,
    UpdateSports: UpdateSportsScreen,
    UpdateRide: UpdateRideScreen,
  },
  config
);

AddStack.navigationOptions = {
  tabBarLabel: 'Event',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-add-circle' : 'md-add-circle'} />
  ),
};

AddStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'} />
  ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LinksStack,
  AddStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
