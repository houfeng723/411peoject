import * as WebBrowser from 'expo-web-browser';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ButtonGroup,
  Button,
} from 'react-native';

import React, {Component} from "react";


export default class AddEventScreen extends Component {
    constructor () {
        super()
        this.state = {
            selectedIndex: 2
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }
    //onPress={() => this.props.navigation.navigate('Repository')}

    render() {

        return (
          <View>
            <Text>
              i need to add event
            </Text>
            
            <Button
                title="Creat a new study event"
                onPress={() => this.props.navigation.navigate('Study')}
            />
            <Button
                title="Creat a new sports event"
                onPress={() => this.props.navigation.navigate('Sports')}
            />
            <Button
                title="Creat a new ride"
                onPress={() => this.props.navigation.navigate('Ride')}
            />
            
          </View>
            
        );
    }
}