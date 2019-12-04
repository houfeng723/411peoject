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

export default class UpdateStudyScreen extends Component {
  // var inputInfo = (
  //   this.state.info === null ? <Text>Info is not fetched</Text> :
  //   <Text > I got things from the server! -> {this.state.info}</Text>
  // )
  constructor(props) {
    super(props)  
    this.state = {
      w_Subject: 'cs',
      w_CourseNumber: 411,
      w_Time: 'Oct 31',
      w_Location : 'Grainger',
      s_Subject: null,
      s_CourseNumber: null,
      s_Time: null,
      s_Location : null,
      returnInfo: null,
    }
 
  }

  updateStudyEvent = () => {
    const { w_Subject }  = this.state ;
    console.log(w_Subject);
    const { w_CourseNumber }  = this.state ;
    const { w_Time }  = this.state ;
    const { w_Location }  = this.state ;
    const { s_Subject }  = this.state ;
    const { s_CourseNumber }  = this.state ;
    const { s_Time }  = this.state ;
    const { s_Location }  = this.state ;

    fetch(SERVER_URL + 'updateStudy', {
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        wSubject: w_Subject,
        wCourseNumber: w_CourseNumber,
        wTime: w_Time,
        wLocation: w_Location,
        sSubject: s_Subject,
        sCourseNumber: s_CourseNumber,
        sTime: s_Time,
        sLocation: s_Location
      }),
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      this.setState({info : "NO ERROR"})}
    ).catch(
      error => this.setState({ info : error.message }) 
    );

  };
    render() {
      let child = (
        this.state.info === null ? <Text>Info is not fetched</Text> :
        <Text > I got things from the server! -> {this.state.info}</Text>
      )
        return (
            
          <View style={styles.MainContainer}>
    
            <Text style= {{ fontSize: 20, color: "#000", textAlign: 'center', marginBottom: 15 }}>
              update a study event
            </Text>

            <Text style= {{ fontSize: 10, color: "#000", textAlign: 'center', marginBottom: 15 }}>
              original
            </Text>

            <TextInput
              // Adding hint in Text Input using Place holder.
              defaultValue = "cs"
              onChangeText={w_Subject => this.setState({w_Subject})}

              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />

            <TextInput
              // Adding hint in Text Input using Place holder.
              //placeholder="Enter Course Number"
              defaultValue = "411"
              onChangeText={w_CourseNumber => this.setState({w_CourseNumber})}

              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />
     
            <TextInput
              // Adding hint in Text Input using Place holder.
              //placeholder="Enter Time"
              defaultValue = "Oct 31"
              onChangeText={w_Time => this.setState({w_Time})}
     
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />
     
            <TextInput
              // Adding hint in Text Input using Place holder.
              //placeholder="Enter Location"
              defaultValue = "Grainger"
              onChangeText={w_Location => this.setState({w_Location})}
     
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />

            <Text style= {{ fontSize: 10, color: "#000", textAlign: 'center', marginBottom: 15 }}>
                revised (follow the same order)
            </Text>

            <TextInput
              // Adding hint in Text Input using Place holder.
              defaultValue = ""
              onChangeText={s_Subject => this.setState({s_Subject})}

              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />

            <TextInput
              // Adding hint in Text Input using Place holder.
              //placeholder="Enter Course Number"
              defaultValue = ""
              onChangeText={s_CourseNumber => this.setState({s_CourseNumber})}

              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />

            <TextInput
              // Adding hint in Text Input using Place holder.
              //placeholder="Enter Time"
              defaultValue = ""
              onChangeText={s_Time => this.setState({s_Time})}

              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />

            <TextInput
              // Adding hint in Text Input using Place holder.
              //placeholder="Enter Location"
              defaultValue = ""
              onChangeText={s_Location => this.setState({s_Location})}

              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
            />
            <Button 
              title="Click Here To Update" 
              onPress={this.updateStudyEvent} 
              color="#2196F3" 
            />
            <Text>
              {this.state.w_Subject}
              {this.state.w_CourseNumber}
              {this.state.w_Time}
              {this.state.w_Location}
              {this.state.s_Subject}
              {this.state.s_CourseNumber}
              {this.state.s_Time}
              {this.state.s_Location}
            </Text>
            
            {child}
          
      
     
    </View>
        );
    }
}

//     password         secureTextEntry={true}