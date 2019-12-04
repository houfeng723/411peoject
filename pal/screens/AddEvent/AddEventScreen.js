import * as WebBrowser from 'expo-web-browser';
import { Button } from 'react-native-elements';
import { FAB, Portal, Provider } from 'react-native-paper';
import {
    Card,
    CardItem,
    Left,
    Title,
    Right,
    Content,
    Thumbnail,
    Body,
    DeckSwiper,
    Item,
    Container,
    H3,
  } from 'native-base';
  
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Icon,
  TouchableOpacity,
  View,
  ButtonGroup,
  
} from 'react-native';

import React, {Component} from "react";


export default class AddEventScreen extends Component {
    constructor () {
        super()
        this.state = {
            open : false,
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
          <View style={{flex:1, flexDirection:'column', justifyContent:'space-evenly', width:'60%', alignSelf:'center'}}>
            <Button
                type="outline"
                raised
                iconRight
                iconContainerStyle={{marginLeft:10}}
                icon={{
                        name:'event',
                        type:'material',
                    }}
                title="Create a new study event"
                onPress={() => this.props.navigation.navigate('Study')}
            />
            <Button
                type="outline"
                raised
                iconRight
                iconContainerStyle={{marginLeft:10}}
                icon={{
                        name:'soccer',
                        type:'material-community',
                    }}
                title="Create a new sports event"
                onPress={() => this.props.navigation.navigate('Sports')}
            />
            <Button
                type="outline"
                raised
                iconRight
                iconContainerStyle={{marginLeft:10}}
                icon={{
                        name:'car',
                        type:'antdesign',
                }}
                title="Create a new ride"
                onPress={() => this.props.navigation.navigate('Ride')}
            />
            <Button
                type="outline"
                raised
                iconRight
                iconContainerStyle={{marginLeft:10}}
                icon={{
                        name:'delete',
                        type:'antdesign',
                }}
                title="Delete a study event"
                onPress={() => this.props.navigation.navigate('DeleteStudy')}
            />
            <Button
                type="outline"
                raised
                iconRight
                iconContainerStyle={{marginLeft:10}}
                icon={{
                        name:'delete',
                        type:'antdesign',
                }}
                title="Delete a sports event"
                onPress={() => this.props.navigation.navigate('DeleteSports')}
            />
            <Button
                type="outline"
                raised
                iconRight
                iconContainerStyle={{marginLeft:10}}
                icon={{
                        name:'delete',
                        type:'antdesign',
                }}
                title="Delete a ride"
                onPress={() => this.props.navigation.navigate('DeleteRide')}
            />
            <Button
                type="outline"
                raised
                iconRight
                iconContainerStyle={{marginLeft:10}}
                icon={{
                        name:'update',
                        type:'material',
                }}
                title="Updating a Study Event"
                onPress={() => this.props.navigation.navigate('UpdateStudy')}
            />
            <Button
                type="outline"
                raised
                iconRight
                iconContainerStyle={{marginLeft:10}}
                icon={{
                        name:'update',
                        type:'material',
                }}
                title="Updating a Sport Event"
                onPress={() => this.props.navigation.navigate('UpdateSports')}
            />
            <Button
                type="outline"
                raised
                iconRight
                iconContainerStyle={{marginLeft:10}}
                icon={{
                        name:'update',
                        type:'material',
                }}
                title="Updating a Ride"
                onPress={() => this.props.navigation.navigate('UpdateRide')}
            />
            
          </View>
            
        );
    }
}