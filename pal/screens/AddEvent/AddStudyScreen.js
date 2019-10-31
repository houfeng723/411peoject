import * as WebBrowser from 'expo-web-browser';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ButtonGroup,
  Button,
} from 'react-native';

import React, {Component} from "react";


export default class AddStudyScreen extends Component {

    render() {

        return (
          <View>
            <Text>
              i need to add study event
            </Text>
            
            <TextInput
                
                placeholder="Type the class here!"
                maxLength={40}
            />

            <TextInput
                placeholder="Type the time here!"
                maxLength={40}
            />

            <TextInput
                placeholder="Type the location here!"
                maxLength={40}
            />

            <Button
                title="Submit"
            />
            
          </View>
            
        );
    }
}