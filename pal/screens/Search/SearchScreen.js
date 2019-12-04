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


import { IconButton, Colors } from 'react-native-paper';
import React, {Component} from "react";
import { H3 } from 'native-base';


export default class SearchScreen extends Component {
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
          <View style={{flex:1,alignItems:'center',flexDirection:'column', justifyContent:'space-evenly', width:'50%', alignSelf:'center'}}>
            <H3 style={{alignSelf:'center'}}> Search Events</H3>
            <View style={{alignItems:'center'}}>
            <IconButton
              icon="library"
              size={80}
              onPress={() => this.props.navigation.navigate('SearchStudy')}
            />
            <Text>
              Study Event
            </Text>
            </View>
            <View style={{alignItems:'center'}}>
            <IconButton
              icon="car-sports"
              size={80}
              onPress={() => this.props.navigation.navigate('SearchRide')}
            />
            <Text>
               Find Rides
            </Text>
            </View>
            <View style={{alignItems:'center'}}>
            <IconButton
              icon="football"
              size={80}
              onPress={() => this.props.navigation.navigate('SearchSport')}
            />
            <Text>
              Sports Events
            </Text>
            </View>            
          </View>
            
        );
    }
}