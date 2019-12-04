import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Button } from 'react-native';
import firebaseSDK from '../../service/firebaseSDK';
export default function ProfileScreen({navigation}) {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  
  return <Button  title="Log out" onPress={()=>navigation.navigate("Auth")}/>
}

ProfileScreen.navigationOptions = {
  title: 'app.json',
};
