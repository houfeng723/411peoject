import * as WebBrowser from 'expo-web-browser';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';

import React, {Component} from "react";
const SERVER_URL = 'http://10.195.239.188:5005/';


export default class HomeScreen extends Component {
    state = {
      info : null,
    };

    // httpRequest
    // body -> information in json format or you can specify in headers
    // headers : authentication ... token client id .. 
    // method : GET PUT DELETE POST ... 
    connectServer = () => {
      fetch(SERVER_URL, {
        headers: {
          'content-type': 'application/json'
        },
        method: 'GET'
      })
      .then(response => response.json())
      .then(data => 
        this.setState({info : data.data[0].name})
      ).catch(
        error => this.setState({ info : error.message }) 
      );

    }

    postStudent = () => {
      fetch(SERVER_URL, {
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          Name: 'new name',
        }),
        method: 'POST'
      })
      .then(response => response.json())
      .then(data => 
        this.setState({info : "nothing ..for post"})
      ).catch(
        error => this.setState({ info : error.message }) 
      );

    }

    render() {
        let child = (
          this.state.info === null ? <Text>Info is not fetched</Text> :
          <Text > I got things from the server! -> {this.state.info}</Text>
        )
        return (
          <View>
            <Text>
              hello
            </Text>
            <Button
                title="going to test"
                onPress={() => this.props.navigation.navigate('Test')}
            />
            <Button 
              title="Get student" 
              onPress={this.connectServer} 
            />
            <Button 
              title="Add student" 
              onPress={this.postStudent} 
            />
            {child}
          </View>
            
        );
    }
}