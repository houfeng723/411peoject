import { Chip, Title } from 'react-native-paper';
import React, {useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Modal, TouchableHighlight, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Divider, Text } from 'react-native-paper';
import { DatePicker, H3} from 'native-base';
import { Button, ButtonGroup, Icon } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
import { AsyncStorage } from 'react-native';

import { addStudyEvent } from '../../service/api_service'
const features = ["CS", "MATH", 
                  "HIST", "BUSINESS", "ART", 
                  "LITERATURE", "MUSIC", "Other"]



export default function FilterPage(props){
    const [feature, setFeature] = useState(features);
    const [courseNumber, setCourseNumber] = useState(null);
    const [selectedFeature, setSelectedFeature] = useState({});
    const [rerender, setRerender] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [location, setLocation] = useState(null);
    const [email, setEmail] = useState(null);
    
    const onSelect = (each) => {
        var newState = selectedFeature;
        Object.keys(newState).map((one, key)=> {
            if(one === each) {
                newState[each] = !newState[each];
            } else {
                newState[one] = false;
            }
        })

        setSelectedFeature(newState);
        
        setRerender(!rerender);
    };

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem("email");
          if (value !== null) {
            setEmail(value);
          } else {
            console.log(value);
          }
        } catch (error) {
          console.log(error);
          // Error retrieving data
        }
      };
    useEffect(()=> {
        _retrieveData();
        let dict = {};
        feature.forEach(each=>{
            dict[each] = false;
        })
        setSelectedFeature(dict);
    },[]);
    

    let filtered = feature.filter((each)=>{
        return selectedFeature[each];
    });
    var child = feature.map((key, index) => {
        return (
            <Chip
                onPress={()=>{
                    onSelect(key);}}
                key={index}
                selected={selectedFeature[key]}
                style={styles.chip}
            >
            {key}
            </Chip>
        );
    })

    const validate = () => {
        if(location === null) {
            alert("Please select a location");
            return false;
        } else if( fromDate === null) {

            alert("Please select a date");
            return false;
        } else if(courseNumber === null) {

            alert("Please enter course number");
            return false;
        } 
        return true;
        
    }

    const submitEvent = () => {
        if(!validate()) {
            return;
        }

        let dict = {};
        let date = new Date(fromDate).toDateString();
        
        let filtered = feature.filter((each)=>{
            return selectedFeature[each];
        });
        if(filtered.length === 0) {
            alert("Please select your subject !")
            return;
        }

        dict["subject"] = filtered[0];
        console.log(dict);
        dict["courseNumber"] = courseNumber;
        dict["date"] = date;
        dict["location"] = location;
        dict["email"] = email;

        addStudyEvent(dict).then(response => {
            if(response.status === 400) {
                alert("Error Occured Submitting");
            } else {
                alert("Add study event success !");
                props.navigation.goBack();
            }
        }).catch(error=>{
            console.log(error);
        });
    }

    return (
        <ScrollView contentContainerStyle={{width: "90%", alignSelf:'center', marginTop:30, justifyContent:'flex-start'}}>
            <Title >Choose Subject</Title>
            <View style={styles.row}>
                {child}
            </View>
            
            <Divider style={{margin:5}} />
            <Title >Course Number</Title>
            <View 
                style={{margin : 20}} >
                <TextInput 
                    label='Required'
                    value={courseNumber}
                    onChangeText={number => setCourseNumber(number)}></TextInput>
            </View>
            <Divider style={{margin:5}} />

            <Title >Date </Title>
            <View 
                style={{margin : 20, 
                    flexDirection: 'row', justifyContent:'space-between'}}>
                    <H3> From </H3>
                    <DatePicker onDateChange={(date)=>setFromDate(date)}/>
            </View>
            <Divider style={{margin:5}} />

            <Title >Location </Title>
            <View 
                style={{margin : 20}} >
                    <SelectLocation setLocation={setLocation}></SelectLocation>
            </View>
            <View>
                
                <Button title="Confirm" onPress={()=>submitEvent()} ></Button>
                <Button title="Cancel" onPress={()=>props.navigation.goBack()} buttonStyle={{marginTop:30}}></Button>

            </View>
            <View style={{height : 60}}></View>
        </ScrollView>
    );
}

const SelectLocation = (props) => {
  const places = ["grainger", "ugl", "siebel"];
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const setIndex = (index)=>{
      setSelectedIndex(index);
      props.setLocation(places[index]);
  }
  const component1 = () => (

    <View style={{alignItems:'center'}}>
        <Icon name='local-library' size={60} />
        <Text> Grainger </Text>
    </View>
    )
  const component2 = () => (

    <View style={{alignItems:'center'}}>
        <Icon name='school' size={60} />
        <Text> UGL </Text>
    </View>
    )
  const component3 = () => (

    <View style={{alignItems:'center'}}>
        <Icon name='computer' size={60} />
        <Text> Siebel </Text>
    </View>
    )

    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
    return (
      <ButtonGroup
        onPress={setIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 200}} />
    )
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