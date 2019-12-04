import { Chip, Title } from 'react-native-paper';
import React, {useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Modal, TouchableHighlight, ScrollView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Divider, Text } from 'react-native-paper';
import { DatePicker, H3} from 'native-base';
import { Button, ButtonGroup, Icon } from 'react-native-elements';
import { TextInput } from 'react-native-paper';

import { getStudyEvent } from '../../service/api_service'
const features = ["CS", "MATH", 
                  "HIST", "BUSINESS", "ART", 
                  "LITERATURE", "MUSIC", "All"]



export default function FilterPage(props){
    const [feature, setFeature] = useState(features);
    const [courseNumber, setCourseNumber] = useState(null);
    const [selectedFeature, setSelectedFeature] = useState({});
    const [rerender, setRerender] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [location, setLocation] = useState(null);
    const [price, setPrice] = useState(null);
    const onSelect = (each) => {
        var newState = selectedFeature;
        if(each in newState) {
            newState[each] = !newState[each];
        } else {
            newState[each] = true;
        }
        setSelectedFeature(newState);
        
        setRerender(!rerender);
    };

    useEffect(()=> {
        let dict = {};
        feature.forEach(each=>{
            dict[each] = false;
        })
        setSelectedFeature(dict);
    },[]);
    

    let filtered = feature.filter((each)=>{
        return selectedFeature[each];
    });
    console.log(feature)
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
    const filterResult = () => {
        let dict = {};
        let date = new Date(fromDate).toDateString();
        
        let filtered = feature.filter((each)=>{
            return selectedFeature[each];
        });
        dict["subject"] = filtered;
        dict["courseNumber"] = courseNumber;
        dict["time"] = date;
        dict["location"] = location;

        console.log(dict);
        getStudyEvent(dict).then(response => response.json())
        .then(data => console.log(data));
    }

    return (
        <ScrollView contentContainerStyle={{width: "90%", alignSelf:'center', marginTop:30, justifyContent:'flex-start'}}>
            <Title >Choose Subjects</Title>
            <View style={styles.row}>
                {child}
            </View>
            
            <Divider style={{margin:5}} />
            <Title >Course Number</Title>
            <View 
                style={{margin : 20}} >
                <TextInput 
                    label='Optional'
                    value={courseNumber}
                    onChangeText={number => setCourseNumber(number)}></TextInput>
            </View>
            <Divider style={{margin:5}} />

            <Title >Date </Title>
            <View 
                style={{margin : 20, 
                    flexDirection: 'row', justifyContent:'space-between',}}>
                    <H3> From </H3>
                    <DatePicker onDateChange={(date)=>setFromDate(date)}/>
                    <H3> To </H3>
                    <DatePicker onDateChange={(date)=>setToDate(date)}/>

            </View>
            <Divider style={{margin:5}} />

            <Title >Location </Title>
            <View 
                style={{margin : 20}} >
                    <SelectLocation setLocation={setLocation}></SelectLocation>
            </View>
                <Button title="Confirm" onPress={()=>filterResult()} buttonStyle={{marginBottom:30 }}></Button>
                <Button title="Cancel" onPress={()=>props.closeModal()}></Button>
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