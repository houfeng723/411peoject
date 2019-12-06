import * as WebBrowser from 'expo-web-browser';
import {Card, Text} from 'native-base';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  AsyncStorage,
} from 'react-native';

import React, {Component, useState, useEffect} from "react";
import { Title, CardItem, H3 } from 'native-base';
import { getRecommend, fetch_port } from '../../service/api_service'

const HomeScreen = (props) =>{
    const [email, setEmail] = useState(null);
    const [course, setCourse] = useState([]);

      
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        // We have data!!
        console.log(value); 
        setEmail(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(()=>{
    _retrieveData();

  }, []);
    // httpRequest
    // body -> information in json format or you can specify in headers
    // headers : authentication ... token client id .. 
    // method : GET PUT DELETE POST ... 

    fetch_recommend = () => {
      fetch_port({email : email}, "recommend").then(response => {
        if(response.status === 400) {
        } else {
            response.json().then(data => {
              console.log(data);
              setCourse(data.records);
            }) 
        }
      }).catch(error=>{
        console.log(error);
      });
    };
    let child = course.map((each, index) => {
      return (
        <Card key={index}>
          <CardItem header bordered>
            <Text> Recommendation : { index + 1 }  </Text>
          </CardItem>
          <CardItem>
            <H3>{each._fields[0]}</H3>
          </CardItem>
        </Card>
      )
      return each;
    })

    if(child.length===0) {
      child = <Text> Not Yet Available </Text>
    }
    return(
          <ScrollView contentContainerStyle={{width:"80%", alignSelf:'center', justifyContent:'space-evenly', flexDirection:'column'}}>
            <Text style={{alignSelf:'center'}}> My Recommended Courses </Text>
            {child}
            <Button title="Get Recommendations" onPress={()=>{fetch_recommend(); console.log("clicked")}}/>
          </ScrollView>
       );
  }

  export default HomeScreen;