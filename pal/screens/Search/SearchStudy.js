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

const SERVER_URL = 'http://10.195.239.188:5005/';

export default class SearchStudyScreen extends Component {
  // var inputInfo = (
  //   this.state.info === null ? <Text>Info is not fetched</Text> :
  //   <Text > I got things from the server! -> {this.state.info}</Text>
  // )
  constructor(props) {
    super(props)  
    this.state = {
      Subject: 'cs',
      CourseNumber: 411,
      Time: 'Oct 31',
      Location : 'Grainger',
      info: null,
      returnID: null,
      returnSubject: null,
      returnCourseNumber: null,
      returnTime: null,
      returnLocation: null,
    }
 
  }

  getStudyEvent = () => {
    const { Subject }  = this.state ;
    console.log("search");
    const { CourseNumber }  = this.state ;
    const { Time }  = this.state ;
    const { Location }  = this.state ;

    fetch(SERVER_URL, {
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        type : "searchStudy",
        subject: Subject,
        courseNumber: CourseNumber,
        time: Time,
        location: Location
      }),
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => //console.log(data)
      this.setState({
          info : "NO ERROR ",
          returnID: data.data[0].id,
          returnSubject: data.data[0].subject,
          returnCourseNumber: data.data[0].courseNumber,
          returnTime: data.data[0].time,
          returnLocation: data.data[0].location,
        })
    ).catch(
      error => this.setState({ info : error.message }) 
    );

  }

    render() {
      let child = (
        this.state.info === null ? <Text>Info is not fetched</Text> :
        <Text > I got things from the server! -> {this.state.info}
            The result is 
            {this.state.returnID} 
            {this.state.returnSubject} 
            {this.state.returnCourseNumber} 
            {this.state.returnTime} 
            {this.state.returnLocation} 
        </Text>
      )
        return (
            
          <View style={styles.MainContainer}>
    
            <Text style= {{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>
              search a study event
            </Text>
      
            <TextInput
              // Adding hint in Text Input using Place holder.
              defaultValue = "cs"
              onChangeText={Subject => this.setState({Subject})}
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />

            <TextInput
              // Adding hint in Text Input using Place holder.
              //placeholder="Enter Course Number"
              defaultValue = "411"
              onChangeText={CourseNumber => this.setState({CourseNumber})}

              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />
     
            <TextInput
              // Adding hint in Text Input using Place holder.
              //placeholder="Enter Time"
              defaultValue = "Oct 31"
              onChangeText={Time => this.setState({Time})}
     
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />
     
            <TextInput
              // Adding hint in Text Input using Place holder.
              //placeholder="Enter Location"
              defaultValue = "Grainger"
              onChangeText={Location => this.setState({Location})}
     
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />

            <Button 
              title="Click Here To Search" 
              onPress={this.getStudyEvent} 
              color="#2196F3" 
            />
            {child}
          
      
     
    </View>
            
        );
    }
}

//     password         secureTextEntry={true}