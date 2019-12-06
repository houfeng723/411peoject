import React, {useEffect, useState} from 'react';
import { AsyncStorage, TouchableOpacity, Modal, View, ScrollView } from 'react-native';
import { Avatar, Title, Divider, TextInput } from 'react-native-paper';
import { ButtonGroup, Button } from 'react-native-elements';
import { fetch_port } from '../../service/api_service';
import { Card, CardItem, Left, Right, Icon, H3, Text} from 'native-base';
export default function ProfileScreen({navigation}) {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  const [info, setInfo] = useState([]);
  const [study, setStudy] = useState([]);
  const [ride, setRide] = useState([]);
  const [email, setEmail] = useState("");
  const [showModal,setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        // We have data!!
        console.log(value);
        fetch_port({email : value}, "user").then(response => {
          if(response.status === 400) {
          } else {
              response.json().then(data => {
                setStudy(data.data.records);
              })
          }
        }).catch(error=>{
          console.log(error);
        });
        fetch_port({email : value}, "user/ride").then(response => {
          if(response.status === 400) {
          } else {
              response.json().then(data => {
                console.log(data);
                setRide(data.data.records);
              })
          }
        }).catch(error=>{
          console.log(error);
        });

      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(()=>{
    _retrieveData();

  }, []);

  let rides = ride.map((obj, index) => {
    let each = obj._fields[0].properties;
    return (
      <TouchableOpacity key={index}>
        <Card container >
          <CardItem bordered>
            <Left>
              <H3> {"From "}</H3>
            </Left>
            <Text style={{flexWrap:'wrap'}}>
             {each.fromLocation}
            </Text>
          </CardItem>
          <CardItem bordered>
            <Left>
              <H3> {"To "}</H3>
            </Left>
            <Text style={{flexWrap:'wrap'}}>
             {each.toLocation}
            </Text>
          </CardItem>
          <CardItem footer>
            <Left>
              <Text> {new Date(each.date).toDateString()} </Text>
            </Left>
            <Right>
              <Text>{"Host : " + each.host}</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
  );
  });

  let studies  = study.map((obj, index) => {
    let each = obj._fields[0].properties;
    return (
        <TouchableOpacity key={index}>
          <Card container >
            <CardItem header>
              <Left>
                <H3> {each.subject + " " + each.courseNumber}</H3>
              </Left>
              <Right>
                <Button
                  type="outline"
                  iconRight
                  disabled
                  iconContainerStyle={{marginLeft:10}}
                  title="Joined"
                />
              </Right>
            </CardItem>
            <CardItem cardBody>
                <Icon name="map" style={{left:20}}></Icon>
                <Text style={{left:25}}> {`Location : ${each.location}`}</Text>
            </CardItem>
            <CardItem footer>
              <Left>
                <Text> {new Date(each.date).toDateString()} </Text>
              </Left>
              <Right>
                <Text>{"Host : " + each.host}</Text>
              </Right>
            </CardItem>
          </Card>
        </TouchableOpacity>
    );
  });
  
  submitChange = async() => {
    let value = await AsyncStorage.getItem('email');
    if (value !== null) {
      console.log("my email right now is : " + email);
      fetch_port({email:value, password:newPassword}, "password").then(response => {
        if(response.status === 200) {
          alert("Success");
        } else {
          alert("Failed!");
        }
      }).catch(error=>{
        console.log(error);
      });
    }else {
      alert("Didn't know email");
    }
  };

  let modal = (
    <Modal
    animationType="slide"
    transparent={false}
    visible={showModal}
    onRequestClose={() => {
        setShowModal(false);
    }}>
      <View style={{width:"100%", height:"100%", flex:1, flexDirection:'column', justifyContent:'space-evenly'}}>
        <TextInput 
                      label='New Password'
                      value={newPassword}
                      onChangeText={number => setNewPassword(number)}></TextInput>
        
        <Button title="submit"
          onPress={()=>{
                submitChange(); 
                setShowModal(false);}}>

        </Button>
      </View>
    </Modal>

  )

  return (
    <ScrollView contentContainerStyle={{ width:"90%",alignContent:'center',flexDirection:'column', alignSelf:'center', padding:20}}>
      <Avatar.Text size={100} label="HF"/>

      <Title >
        My Study Events
      </Title>
      <Divider style={{margin:5}}></Divider>
      {studies}
      <Title >
        My Rides
      </Title>
      <Divider></Divider>
      {rides}

      <Button containerStyle={{width: "80%", padding:20 }}
              title="Reload" 
              type="outline"
              onPress={()=>_retrieveData()}/>
      
      <Button containerStyle={{width: "80%", padding:20 }}
              title="Edit Password" 
              type="outline"
              onPress={()=>setShowModal(true)}/>
      
      <Button containerStyle={{width: "80%", padding:20 }}
              title="Log out" 
              type="outline"
              onPress={()=>navigation.navigate("Auth")}/>
      
      {modal}

    </ScrollView>);
  }

ProfileScreen.navigationOptions = {
  title: 'Profile',
};
