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
                title="Create a new study event"
                onPress={() => this.props.navigation.navigate('Study')}
            />
            <Button
                title="Create a new sports event"
                onPress={() => this.props.navigation.navigate('Sports')}
            />
            <Button
                title="Create a new ride"
                onPress={() => this.props.navigation.navigate('Ride')}
            />
            <Button
                title="Delete a study event"
                onPress={() => this.props.navigation.navigate('DeleteStudy')}
            />
            <Button
                title="Delete a sports event"
                onPress={() => this.props.navigation.navigate('DeleteSports')}
            />
            <Button
                title="Delete a ride"
                onPress={() => this.props.navigation.navigate('DeleteRide')}
            />
            <Button
                title="Updating a Study Event"
                onPress={() => this.props.navigation.navigate('UpdateStudy')}
            />
            <Button
                title="Updating a Sport Event"
                onPress={() => this.props.navigation.navigate('UpdateSports')}
            />
            <Button
                title="Updating a Ride"
                onPress={() => this.props.navigation.navigate('UpdateRide')}
            />
            
          </View>
            
        );
    }
}