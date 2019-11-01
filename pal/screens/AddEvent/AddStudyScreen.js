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


const styles = StyleSheet.create({
 
  MainContainer :{
   
  justifyContent: 'center',
  flex:1,
  margin: 10
  },
   
  TextInputStyleClass: {
   
  textAlign: 'center',
  marginBottom: 7,
  height: 40,
  borderWidth: 1,
  // Set border Hex Color Code Here.
   borderColor: '#2196F3',
  
   // Set border Radius.
   borderRadius: 5 ,
   
  // Set border Radius.
   //borderRadius: 10 ,
  }
   
});


export default class AddStudyScreen extends Component {
  // var inputInfo = (
  //   this.state.info === null ? <Text>Info is not fetched</Text> :
  //   <Text > I got things from the server! -> {this.state.info}</Text>
  // )
  constructor(props) {
    super(props)  
    this.state = {
      Subject: '',
      CourseNumber: '',
      Time: '',
      Location : null,
 
    }
 
  }
    render() {
        return (
            
          <View style={styles.MainContainer}>
    
            <Text style= {{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>User Registration Form</Text>
      
            <TextInput
              // Adding hint in Text Input using Place holder.
              placeholder="Enter Course Subject"
              onChangeText={Subject => this.setState({Subject})}

              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />

            <TextInput
              // Adding hint in Text Input using Place holder.
              placeholder="Enter Course Number"
              onChangeText={CourseNumber => this.setState({CourseNumber})}

              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />
     
            <TextInput
              // Adding hint in Text Input using Place holder.
              placeholder="Enter Time"
              onChangeText={Time => this.setState({Time})}
     
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />
     
            <TextInput
              // Adding hint in Text Input using Place holder.
              placeholder="Enter User Password"
              onChangeText={Location => this.setState({Location})}
     
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
              secureTextEntry={true}
            />

            <Button 
              title="Click Here To Display" 
              onPress={this.UserRegistrationFunction} 
              color="#2196F3" 
            />
     
            <Button 
              title="Click Here To Register" 
              onPress={this.UserRegistrationFunction} 
              color="#2196F3" 
            />
          
      
     
    </View>
            
        );
    }
}