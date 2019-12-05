import { Chip, Title } from 'react-native-paper';
import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Modal, TouchableHighlight, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import MapView, { Polyline } from 'react-native-maps';
import { Divider, Text } from 'react-native-paper';
import { DatePicker, H3, Card, Body, Icon, Input, Item, CardItem, Left, Right} from 'native-base';
import { Button, ButtonGroup, SearchBar, ListItem} from 'react-native-elements';
import { TextInput } from 'react-native-paper';
const request_url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDaBE821YtcKHCQ1bGXuu8hUK24vlbrjcU&input=";
const location_url = "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyDaBE821YtcKHCQ1bGXuu8hUK24vlbrjcU&fields=geometry&place_id=";
import { addRide } from '../../service/api_service'
import { AsyncStorage } from 'react-native';

export default function FilterPage(props){
    const [rerender, setRerender] = useState([]);
    const [fromLocation, setFromLocation] = useState({address:""});
    const [toLocation, setTolocation] = useState({address:""});
    const [date, setDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [from, setFrom] = useState(false);
    const [search, setSearch ]= useState(null);
    const [predictions, setPredictions] = useState([]);
    const [lines, setLines] = useState([]);
    const [email, setEmail] = useState(null);
    mapRef = useRef(null);

    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem("email");
        if (value !== null) {
          console.log(value);
          setEmail(value);
        } else {
          console.log(value);
        }
      } catch (error) {
        console.log(error);
        // Error retrieving data
      }
    };
    useEffect(()=>{
      _retrieveData();
    },[])
    async function autoComplete(destination) {
      setSearch(destination);
      let response = await fetch(request_url + destination);
      response.json().then((res) => {
          setPredictions(res.predictions);
          setShowModal(true);
      }).catch((error) => {
          console.log(error);
      });
    } 

    const zoom_to_fit = (from, to) => {
      if(!to.latitude || !from.latitude) {
        return;
      }
      mapRef.fitToCoordinates([from, to], {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true,
      });
      setLines([from, to]);
    }

    async function locateAddress(place_id, description) {
      let response = await fetch(location_url + place_id);
      response.json().then((resp)=>{
        let dict = {};
        dict["address"] = description;
        dict["longitude"] = resp.result.geometry.location.lng ;
        dict["latitude"] = resp.result.geometry.location.lat;
        
        if(from) { 
          // updateMap(true, dict);
          setFromLocation(dict);
          zoom_to_fit(dict, toLocation);
        } else {
          // updateMap(false, dict)
          setTolocation(dict);

          zoom_to_fit(fromLocation, dict);
        }
      });
    }

    const updateAddress = (info) => {
      console.log(info);
    }
    const predicts = predictions.map((each, index) => {  
        return (
            <TouchableOpacity key={index} 
            onPress={()=>{
              setShowModal(false);
              locateAddress(each.place_id, each.description);
           }}>
            <ListItem
                key={index}
                title={each.description}
                bottomDivider
            />
        </TouchableOpacity>
        );
    })
    const modal = (
      <Modal
          animationType="slide"
          transparent={false}
          visible={showModal}
          onRequestClose={() => {
              setShowModal(false);
          }}>
          <SearchBar lightTheme
                     value={search}
                     placeholder="Find Your Apartment"
                     onChangeText={(name)=>autoComplete(name)}
          />
          <ScrollView >
              {predicts}
          </ScrollView>
      </Modal>);
  
    const submitEvent = () => {
      let dict = {}
      dict["fromLocation"] = fromLocation.address;
      dict["toLocation"] = toLocation.address;
      dict["date"] = date;
      dict["email"] = email;
      addRide(dict).then(resp=> {
        if(resp.status === 200) {
          alert("Success");
          props.navigation.goBack();
        } else {
          alert("Failed");
        }
      });
      // resp.json().then((res) => {
      //   if(res.status === 200) {
      //     alert("Success");
      //     props.navigation.goBack();
      //   } else {
      //     alert("Failed");
      //   }
      // })
    }

    return (
        <ScrollView contentContainerStyle={{width: "90%", alignSelf:'center', marginTop:5, justifyContent:'flex-start'}}>
            <Card>
              <CardItem bordered>
                    <MapView style={styles.mapStyle}
                        ref={ref => {
                          mapRef = ref;
                        }}
                        // region={{
                        //     latitude: latitude,
                        //     longitude: longitude,
                        //     latitudeDelta: 0.01,
                        //     longitudeDelta: 0.01,
                        //   }}
                    >
                        {lines.length === 2 && 
                        <Polyline coordinates={lines}
                          strokeWidth={6}/>}
                        {fromLocation.latitude  && <MapView.Marker
                            coordinate={{
                              latitude: fromLocation.latitude,
                              longitude: fromLocation.longitude
                            }}
                            title={fromLocation.address}
                            description={"from"}
                        />}
                        {toLocation.latitude  && <MapView.Marker
                            coordinate={{
                              latitude: toLocation.latitude,
                              longitude: toLocation.longitude
                            }}
                            title={toLocation.address}
                            description={"To"}
                        />}
                    </MapView> 
                </CardItem>
                <CardItem bordered>
                  <Left> 
                    <H3>Starting at</H3>
                  </Left>
                  <Body>
                      <Item regular >
                          <Icon iconStyle={{left:3}} active name="home"/>
                          <Input placeholder="Enter Starting Location"
                              value={fromLocation.address}
                              onChangeText={(name)=>setFromLocation({address : name})}/>
                          <TouchableHighlight>
                            <Icon iconStyle={{right : 5}} type="MaterialIcons" name="find-replace"  onPress={()=>{setShowModal(true); setFrom(true);}}/>   
                          </TouchableHighlight>
                      </Item>
                    </Body>
                </CardItem>
                <CardItem>
                  <Left> 
                    <H3>To</H3>
                  </Left>
                  <Body>
                      <Item regular >
                          <Icon iconStyle={{left:3}} active name="car"/>
                          <Input placeholder="Enter Destination"
                              value={toLocation.address}
                              onChangeText={(name)=>setToLocation({address : name})}
                          />
                          <TouchableHighlight>
                              <Icon iconStyle={{right : 5}} type="MaterialIcons" name="find-replace"  onPress={()=>{setShowModal(true); setFrom(false);}}/>   
                          </TouchableHighlight>
                      </Item>
                  </Body>
                </CardItem>
            </Card>

            <Title >Date </Title>
            <View 
                style={{margin : 20, 
                    flexDirection: 'row', justifyContent:'space-between'}}>
                    <H3> From </H3>
                    <DatePicker onDateChange={(date)=>setDate(date)}/>
            </View>
            <Divider style={{margin:5}} />

            <View>  
              <Button title="Confirm" onPress={()=>submitEvent()} ></Button>
              <Button title="Cancel" onPress={()=>props.navigation.goBack()} buttonStyle={{marginTop:30}}></Button>
            </View>
            <View style={{height : 60}}></View>
            {modal}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title : {
        flex:1,
        margin:10,
    },
    mapStyle: {
      width: '100%',
      height: 200
    },
    row: {
        margin:10,
        flex:1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,  
    },
    chip: {
        margin : 4,
    },
});