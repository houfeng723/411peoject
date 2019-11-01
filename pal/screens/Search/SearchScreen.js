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
          <View>
            <Text>
              i need to search event
            </Text>
            
            <Button
                title="search study event"
                onPress={() => this.props.navigation.navigate('SearchStudy')}
            />
            <Button
                title="search sports event"
                onPress={() => this.props.navigation.navigate('SearchSports')}
            />
            <Button
                title="search ride"
                onPress={() => this.props.navigation.navigate('SearchRide')}
            />
            
          </View>
            
        );
    }
}